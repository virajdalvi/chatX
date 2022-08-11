import { Box } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../Context/ChatProvider';

const ChatBox = () => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="#181D21"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
    >
      </Box>
  )
}

export default ChatBox