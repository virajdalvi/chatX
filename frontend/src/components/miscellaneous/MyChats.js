import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
const MyChats = () => {
  const[loggedUser,setLoggedUser]=useState()
  const {selectedChat,user,setSelectedChat,chats,setChats} = ChatState()
  return (
    <div>MyChats</div>
  )
}

export default MyChats