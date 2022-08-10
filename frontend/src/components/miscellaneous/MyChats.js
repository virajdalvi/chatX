import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useToast, } from '@chakra-ui/react'

const MyChats = () => {
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
      setChats(data)
    }
    catch(error){
      

    }
  }
  return (
    <div>MyChats</div>
  )
}

export default MyChats