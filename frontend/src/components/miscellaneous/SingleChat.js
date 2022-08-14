import { Avatar, Box, Button, FormControl,IconButton, Image, Input, InputGroup, InputRightElement, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import img from "../../Images/Online world-pana.svg";
import { getSender,getSenderFull,getuserProfile,groupProfile } from '../../config/ChatLogics'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat'
import axios from 'axios';
import "../../components/style.css"
import io, { Socket } from 'socket.io-client'
import Lottie from "react-lottie"
import animationData from '../../animation/typing.json'
const ENDPOINT ="http://localhost:5000";
var socket,selectedChatCompare
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const toast = useToast()
    const {user,selectedChat,setSelectedChat} = ChatState();
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const[socketConnected,setSocketConnected]=useState(false)
    const [typing, setTyping] = useState(false)
    const[istyping,setIsTyping] = useState(false)
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
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
              socket.emit("join chat",selectedChat._id)
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
      console.log(event,'EVENT')
        if(event.key==='Enter' && newMessage){
            socket.emit('stop typing',selectedChat._id)
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
                socket.emit("new message",data)
                setMessages([...messages,data])
                setNewMessage("")
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
    const sendButton =async()=>{
      if(newMessage){
        socket.emit('stop typing',selectedChat._id)
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
            socket.emit("new message",data)
            setMessages([...messages,data])
            setNewMessage("")
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
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
  
      // eslint-disable-next-line
    }, []);
  
   useEffect(() => {
    fetchMessages();
    setNewMessage("")
    selectedChatCompare=selectedChat
    // eslint-disable-next-line
  }, [selectedChat]);
  //real time messages
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  //For socket
  
  
    const typingHandler =(e)=>{
    
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
                <div className='messages'>
                    <ScrollableChat
                        messages={messages}
                    />
                </div>
            }
                
                <FormControl
                    onKeyDown={sendMessage}
                    isRequired
                    mt={3}
                    placeholder="Enter a message...."
                 >
                    {istyping ?
                      <Box
                        display={"flex"}
                      >
                        <Avatar size={"sm"} cursor={"pointer"} name={selectedChat.isGroupChat ? selectedChat.chatName :getSender(user,selectedChat.users)} src={
                      
                      getuserProfile(user,selectedChat.users)==="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? getSender(user,selectedChat.users) : selectedChat.isGroupChat ? groupProfile(selectedChat.chatName): getuserProfile(user,selectedChat.users)
                    
                    }/>
                      <Lottie
                        options={defaultOptions}
                        height={50}
                        width={70}
                        style={{ marginBottom: 15, marginLeft: 0 }}
                      />
                      </Box>
                       
                    
                        
                    :<></>}
                    <InputGroup>
                    
                    <Input
                        variant={"filled"}
                        bg={"#181D21"}
                        _hover={"#181D21"}
                        _active={"#181D21"}
                        onChange={typingHandler}
                        value={newMessage}
                        
                    />
                        <InputRightElement onClick={sendButton}  children={<ArrowForwardIcon bg='green.500' w={6} h={6} borderRadius={"50"}/>} />
                          {/*
                          <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={sendMessage}>
                            <ArrowForwardIcon bg='green.500' w={6} h={6} borderRadius={"50"}/>
                            </Button>
          </InputRightElement>*/}
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