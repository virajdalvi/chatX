import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import "./ChatPage.css"
const ChatPage = () => {
  const {user} = ChatState();
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box w="100%" h="91.5vh" p="10px">
      
        <Flex>
          {user && <MyChats/>}
          <Spacer/>
          {user && <ChatBox/>}
        </Flex>
      </Box>
    </div>
  );
};

export default ChatPage;
