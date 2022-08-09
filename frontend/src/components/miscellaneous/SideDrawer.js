import { Box, Button, Show, Text, Tooltip,Flex,Spacer, Menu, MenuButton, Avatar } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon,ChatIcon } from '@chakra-ui/icons'

import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const SideDrawer = () => {
  const {user} = ChatState()
  return (
    <>
      <Box background={"#181D21"}
        w="100%"
        p="5px 10px 5px 10px"
       borderRadius={10}>
        <Flex>
          <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
            <Button variant="ghost" _hover={{ bg: '#272f36' }} _active={{bg: '#272f36'}} _focus={{bg: '#272f36'}}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Show above='sm'>
                <Text pl={4}>
                  Search User
                </Text>
              </Show>
            </Button>
          </Tooltip>
          <Spacer />
          <Text fontSize={"2xl"}>
            <ChatIcon mr={2} color="red.500"/>
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
                <Avatar size={"sm"} cursor={"pointer"} name={user.name}/>
              </MenuButton>
            </Menu>
          </div>
        </Flex>
      </Box>
    </>
  )
}

export default SideDrawer