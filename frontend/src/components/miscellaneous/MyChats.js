import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Box, Button, Flex, Spacer, Stack, Text, useToast, } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender,getuserProfile } from '../../config/ChatLogics'
import GroupchatModal from './GroupchatModal'
const MyChats = ({fetchAgain}) => {
  const[loggedUser,setLoggedUser]=useState()
  const {selectedChat,user,setSelectedChat,chats,setChats} = ChatState()
  const toast = useToast()
  const fetchChats = async ()=>{
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat",config);
      console.log("y",data)
      setChats(data)
      
      
    }
    catch(error){
      toast({
        title: "Error Occured!",
        description:"Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  },[fetchAgain])
  return (
    <>  
      <Box  display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      bg="#181D21"
      w={{base:"100%",md:"31%"}}
      borderRadius={5}
      h={"90vh"}
      
      >
      
        <Box
         pb={3}
         px={3}
         fontSize={{base:"20px",md:"25px"}}
         
         w="100%"
         justifyContent={"space-between"}
         alignItems="center"
         
      >
        <Flex>
          MyChats
          <Spacer/>
        <Button
          fontSize={{base:"15px"}}
          rightIcon={<AddIcon/>}
          bg='#272f36'
          variant="ghost" _hover={{ bg: '#272f36' }} _active={{bg: '#272f36'}} 
          mb={4}
        >
          <GroupchatModal>
            New Group Chat
          </GroupchatModal>
         
        </Button>
      
        </Flex> 
        <Box
        
        pt={3}
        w="100%"
        h="100%"
        borderRadius={"lg"}
        overflowY="hidden"
        >
         {
          chats ? (
              <Stack
              overflowY="scroll"
              p={0}
              m={0}
              >
                {chats.map((chat)=>(
                  <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#4E39A0" : ""}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={chat._id}
                  fontSize={{base:"18px"}}
                  >
                    <Flex>
                    <Avatar size={"sm"} cursor={"pointer"} name={getSender(loggedUser,chat.users)} src={
                      getuserProfile(loggedUser,chat.users)==="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? getSender(loggedUser,chat.users) : getuserProfile(loggedUser,chat.users)
                    }/>
                    <Text pl={4}>
                      {!chat.isGroupChat ? (
                        getSender(loggedUser,chat.users)
                      ):chat.chatName}
                    </Text>
                    
                    </Flex>
                    
                  </Box>
                ))}
              </Stack>
          ) : (
            <ChatLoading/>
          )
         }
        </Box>
      </Box>
        
       
      </Box>
      
      
    
    </>
      
  )
}

export default MyChats