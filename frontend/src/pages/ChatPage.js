import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import "./ChatPage.css"
const ChatPage = () => {
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box w="100%" h="93vh" p="10px" display={"flex"}>
      
        
          {user && <MyChats
            fetchAgain={fetchAgain}          
          />}
          <Spacer/>
          {user && <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            
          />}
        
      </Box>
    </div>
  );
};

export default ChatPage;
