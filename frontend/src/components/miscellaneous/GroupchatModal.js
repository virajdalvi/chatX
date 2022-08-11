import React,{useState} from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button,Modal,ModalContent,ModalOverlay,ModalHeader,ModalCloseButton,ModalFooter,ModalBody,Lorem, IconButton, Text, useToast, FormControl, Input, Spinner, Box } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from './UserListItem'
import UserBadgeItem from './UserBadgeItem'

const GroupchatModal = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers]=useState([])
  const[search,setSearch]=useState("")
  const[searchResult, setSearchResult]=useState([])
  const[loading,setLoading] = useState(false)
  const toast = useToast()
  const {user,chats,setChats}=ChatState()
  const handleDelete=(delUser)=>{
    setSelectedUsers(selectedUsers.filter(sel=>sel._id !== delUser._id))
  }
  const handleSearch = async(query)=>{
    setSearch(query)
    if(!query){
      return
    }
    try{
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`,config);
      setLoading(false)
      setSearchResult(data)
    }catch(error){
      toast({
        title: "Error Occured!",
        description:"Failed to Load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  const handleGroup=(userToAdd)=>{
    if(selectedUsers.includes(userToAdd)){
      toast({
        title: "Error Occured!",
      description:"Failed to Load the search results",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
      })
      return;
    }
    setSelectedUsers([...selectedUsers,userToAdd])
  }
  const handleSubmit = async()=>{
    if(!groupChatName || !selectedUsers){
      toast({
        title: "Please Fill all the fields",
      description:"Failed to Load the search results",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
      })
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat/group`,{
        name:groupChatName,
        users:JSON.stringify(selectedUsers.map((u)=>u._id))
      },config);
      setChats([data,...chats])
      onClose()
      toast({
      title: "New Group Created",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
      })
    } catch (error) {
      toast({
        title: "Failed to create the Group",
        description:error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        })
    }
      
    }

  
  return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal isOpen={isOpen} onClose={onClose} backgroundColor={"#181D21"}>
      <ModalOverlay />
      <ModalContent bg={"#181D21"}>
        <ModalHeader
        fontSize={"20px"}
        display="flex"
        justifyContent={"center"}
        >Create Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody 
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        >
          <FormControl>
            <Input
              placeholder='Group Name'
              mb={3}
              onChange={(e)=>setGroupChatName(e.target.value)}
            >
              </Input>
          </FormControl>
          <FormControl>
            <Input
              placeholder='Add Users eg: John,Jane,Piyush'
              mb={1}
              onChange={(e)=>handleSearch(e.target.value)}
            >
              </Input>
          </FormControl>
          <Box w={"100%"} display="flex" flexWrap={"wrap"}>
            {
              selectedUsers.map(
                (u)=>(
                  <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}

                  />
                )
              )
            }
          </Box>
          
          {loading ? <Spinner/>: (
            searchResult?.slice(0,4).map(
              user=>(
                <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
              )
            )
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="whatsapp" onClick={handleSubmit}>
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GroupchatModal