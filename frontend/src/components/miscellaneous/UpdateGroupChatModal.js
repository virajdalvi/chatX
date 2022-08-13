import React,{useState} from 'react'
import { Box, FormControl,Input, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import {  Button,Modal,ModalContent,ModalOverlay,ModalHeader,ModalCloseButton,ModalFooter,ModalBody,Lorem, IconButton, Text } from '@chakra-ui/react'
import {ViewIcon} from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from './UserBadgeItem'
import axios from "axios"
import UserListItem from './UserListItem'
import { set } from 'mongoose'
const UpdateGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessages}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user,selectedChat,setSelectedChat} = ChatState();
    const [groupChatName, setGroupChatName] = useState()
    const[search,setSearch]=useState("")
    const[searchResult, setSearchResult]=useState([])
    const[loading,setLoading] = useState(false)
    const[renameloading,setRenameLoading]=useState(false)
    const toast=useToast()
    const handleRemove = async(user1)=>{
      if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
        toast({
          title: "Only admins can remove",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return
      }
      try { 
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.put(
          `/api/chat/groupremove`,
          {
            chatId:selectedChat._id,
            userId:user1._id
          },
          config
        )
          user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
          setFetchAgain(!fetchAgain)
          fetchMessages()
          setLoading(false)
      } catch (error) {
        toast({
          title: "Only admins can remove someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

    }
    const handleAddUser = async(user1)=>{
      if(selectedChat.users.find((u)=>u._id === user1._id)){
        toast({
          title: "User Already Exists in Group!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      if(selectedChat.groupAdmin._id !== user._id){
        toast({
          title: "Only admins can add someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      try {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.put('/api/chat/groupadd',{
          chatId:selectedChat._id,
          userId: user1._id,
        },config)
        setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        setLoading(false)

      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false)
      }

    }
    const handleRename = async()=>{
      if(!groupChatName) return
      try {
        setRenameLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.put('/api/chat/rename',{chatId:selectedChat._id,
        chatName:groupChatName
        },
        config
        )
        setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        setRenameLoading(false)
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setRenameLoading(false)
      }
      setGroupChatName("")
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
  return (
    <>
      <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}
         variant="ghost" _hover={{ bg: '#181D21' }} _active={{bg: '#272f36'}}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={"#272f36"}>
          <ModalHeader
            fontSize={"20px"}
            display="flex"
            justifyContent={"center"}
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display={"flex"}
              flexWrap="wrap"
              w={"100%"}
            >
              {
                selectedChat.users.map((u)=>(
                  <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}

                  />
                ))
              }
            </Box>
            <FormControl>
              <Box display={"flex"}>
              <Input
              placeholder='Group Name'
              mb={3}
              value={groupChatName}
              onChange={(e)=>setGroupChatName(e.target.value)}
              mr={2}
              mt={2}
            />
              <Button
                colorScheme={"whatsapp"}
                mt={2}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
              </Box>
           
              
              
          </FormControl>
          <FormControl>
            <Input
              placeholder='Add Users eg: John,Jane,Piyush'
              mb={1}
              onChange={(e)=>handleSearch(e.target.value)}
            >
              </Input>
          </FormControl>
          {loading ? <Spinner/>: (
            searchResult?.slice(0,4).map(
              user=>(
                <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)}/>
              )
            )
          )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user)}>
                Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}

export default UpdateGroupChatModal