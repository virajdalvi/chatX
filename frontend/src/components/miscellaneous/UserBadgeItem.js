import { CloseIcon } from '@chakra-ui/icons'
import { Badge, Box, CloseButton, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <>
        <Box
        px={2}
        py={2}
        mt={2}
        pl={2}
        mr={2}
        borderRadius="lg"
        mb={2}
        variant="solid"
        fontSize={12}
        backgroundColor="#4E39A0"
        cursor={"pointer"}
        onClick={handleFunction}
        >
            {user.name}
            <CloseIcon pl={1}/>    
        </Box>    
    </>
  )
}

export default UserBadgeItem