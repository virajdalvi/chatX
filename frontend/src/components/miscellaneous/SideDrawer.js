import { Box, Button, Show, Text, Tooltip,Flex,Spacer, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Divider, DrawerBody, Input, HStack, Spinner } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon,ChatIcon } from '@chakra-ui/icons'
import "../../pages/ChatPage.css"
import React,{useState} from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from "react-router-dom";
import { useToast,useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItem'

const SideDrawer = () => {
  const {user,setSelectedChat,chats,setChats} = ChatState()
  const history = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const accessChat=async(userId)=>{
    try{
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat",{userId},config);
      if(!chats.find((c)=>c._id === data._id)) setChats([data,...chats])

      setSelectedChat(data)
      setLoadingChat(false)
      onClose()
    }catch(error){
      toast({
        title: "Error fetching the chat",
        description:error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const logoutHandler=()=>{
    localStorage.removeItem("userInfo")
    history("/")
  }
  return (
    <>
      <Box background={"#181D21"}
        w="100%"
        p="5px 10px 5px 10px"
       borderRadius={10}>
        <Flex>
          <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
            <Button variant="ghost" _hover={{ bg: '#272f36' }} _active={{bg: '#272f36'}} onClick={onOpen}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Show above='sm'>
                <Text pl={4}>
                  Search User
                </Text>
              </Show>
            </Button>
          </Tooltip>
          <Spacer />
          <i class="fa-brands fa-rocketchat logo"></i>
          <Text fontSize={"2xl"} pl={2}>
            chatX
          </Text>
          <Spacer />
          <div>
            <Menu>
              <MenuButton p={1}>
                <BellIcon fontSize={"2xl"} m={1}/>
              </MenuButton>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} variant='ghost'  _hover={{ bg: '#272f36' }} _active={{bg: '#272f36'}} _focus={{bg: '#272f36'}}>
                <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.pic}/>
              </MenuButton>
              <MenuList backgroundColor={"#181D21"} border={0}>
                <MenuItem backgroundColor={"#181D21"}  _active={{bg: '#272f36'}} _focus={{bg: '#272f36'}}>
                  <ProfileModal user={user}>
                    {/*My Profile*/}
                  </ProfileModal>
                </MenuItem>
                <MenuDivider color={"GrayText"}/>
                <MenuItem onClick={logoutHandler} backgroundColor={"#181D21"}  _active={{bg: '#272f36'}} _focus={{bg: '#272f36'}}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Flex>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} background={"#181D21"}> 
        <DrawerOverlay>
          <DrawerContent background={"#181D21"}>
            <DrawerHeader>
              Search User
              <Divider pt={3}/>
            </DrawerHeader>
            <DrawerBody>
              
                <Box pb={5} d="flex" flexDirection={"horizontal"}>
                  <Flex>
                  <Input
                  placeholder={"Search by name or email"}
                  mr={2}
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}></Input>
                  <Button onClick={handleSearch} colorScheme='whatsapp'>Go</Button>
                  </Flex>
                  
                </Box>
                {loading ? (
              <ChatLoading />
            ) : (
             searchResult?.map(
              (user)=>(
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                
                
                />
              )
             )

            )}
              {loadingChat && <Spinner ml="auto" d="flex"/>}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default SideDrawer