import { Avatar, Box, Divider, FormControl, Icon, IconButton, Image, Input, InputGroup, InputRightElement, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import img from "../../Images/Online world-pana.svg";
import { getSender,getSenderFull,getuserProfile,groupProfile } from '../../config/ChatLogics'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import "../../components/style.css"
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const toast = useToast()
    const {user,selectedChat,setSelectedChat} = ChatState();
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    
    const fetchMessages=async()=>{
        if(!selectedChat) return;
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
              setLoading(true)
              const {data} =await axios.get(`/api/message/${selectedChat._id}`,config)
              setMessages(data)
              setLoading(false)
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description:"Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                  });
        }

    }
    console.log("Here",messages)

    const sendMessage = async(event)=>{
        if(event.key==='Enter' && newMessage){
            try {
                const config = {
                    headers: {
                      "Content-Type":"application/json",
                      Authorization: `Bearer ${user.token}`,
                    },
                  };
                  setNewMessage("")
                const {data} = await axios.post(`/api/message`,{
                    content:newMessage,
                    chatId:selectedChat._id,
                
                },config)
                console.log(data)
                setNewMessage("")
                setMessages([...messages,data])
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description:"Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                  });
            }
        }

    }
    
   useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [selectedChat]);
    const typingHandler =(e)=>{
        setNewMessage(e.target.value)
    }
    
    
  return (
    <>
        {selectedChat ? (

            <>
                
                {/*<Avatar size={"md"} cursor={"pointer"} name={selectedChat.isGroupChat ? groupProfile(selectedChat.chatName):getSender(user,selectedChat.users)} src={
                      
                      getuserProfile(user,selectedChat.users)==="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? getSender(user,selectedChat.users) : selectedChat.isGroupChat ? groupProfile(selectedChat.chatName): getuserProfile(user,selectedChat.users)
                    
                    }/>*/}
                     
                
                <Box>
                    
                </Box>
                <Text
                    fontSize={{base:"20px",md:"22px"}}
                    pb={3}
                    px={2}
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent={{ base: "space-between" }}
                >
                    
                    
                    <IconButton
                    display={{base:"flex",md:"none"}}
                    icon={<ArrowBackIcon/>}
                    onClick={()=>setSelectedChat("")}
                      _hover={{ bg: '#272f36' }} _active={{bg: '#272f36'}}  bg="#272f36"
                     marginRight={2}
                    />
                    <Avatar size={"md"} cursor={"pointer"} name={selectedChat.isGroupChat ? selectedChat.chatName :getSender(user,selectedChat.users)} src={
                      
                      getuserProfile(user,selectedChat.users)==="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? getSender(user,selectedChat.users) : selectedChat.isGroupChat ? groupProfile(selectedChat.chatName): getuserProfile(user,selectedChat.users)
                    
                    }/>
                    {
                        !selectedChat.isGroupChat ? (
                            <>
                                {getSender(user,selectedChat.users)}
                                <ProfileModal user={getSenderFull(user,selectedChat.users)} justifyContent="space-between"/>
                            </>

                        ) :(
                            <>
                                {selectedChat.chatName}
                                {<UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages}
                                    
                                />}
                            </>
                        )
                    }
                    
                </Text>
               
                
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent="flex-end"
                    p={3}
                    bg="#0D1113"
                    w="100%"
                    h="100%"
                    borderRadius={"lg"}
                    overflowY="hidden"
                    

                >
                {loading ? 
                <Spinner
                    size={"xl"}
                    w={"20"}
                    h={"20"}
                    alignSelf="center"
                    margin={"auto"}
                
                /> : 
                <>
                    {/*Messages*/}
                </>}
                
                <FormControl
                    onKeyDown={sendMessage}
                    isRequired
                    mt={3}
                    placeholder="Enter a message...."
                 >
                    <InputGroup>
                    <Input
                        variant={"filled"}
                        bg={"#181D21"}
                        onChange={typingHandler}
                        value={newMessage}
                        
                    />
                        <InputRightElement children={<ArrowForwardIcon bg='green.500' w={6} h={6} borderRadius={"50"}/>} />

                    </InputGroup>
               
                
                    


                 </FormControl>
                </Box>
                 
            </>
        ) : (

            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                h="100%"
            >
                
                <Image
                    
                    
                    src={img}
                    alt='Dan Abramov'
                    size="lg"
                />
                <Text fontSize="3xl" pb={3} pt={3}>
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
    </>
  )
}

export default SingleChat