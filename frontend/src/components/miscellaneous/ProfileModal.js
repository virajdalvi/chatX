import React from 'react'
import {  Center,Image,Button,Modal,ModalContent,ModalOverlay,ModalHeader,ModalCloseButton,ModalFooter,ModalBody,Lorem, IconButton, Text } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import{ViewIcon} from '@chakra-ui/icons'
const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        {
          children ? (
            <span onClick={onOpen}>{children}</span>
          ):(
            <IconButton
              d={{base:"flex"}}
              icon={<ViewIcon/>}
              onClick={onOpen}
              backgroundColor={"#272f36"}
              variant="ghost" _hover={{ bg: '#181D21' }} _active={{bg: '#272f36'}}
            >

            </IconButton>

          )
        }
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose} backgroundColor={"#181D21"} isCentered>
        <ModalOverlay />
        <Center>
        <ModalContent backgroundColor={"#272f36"}>
        
          <ModalHeader fontSize={{base:"30px",md:"30px"}}><Center>
          {user.name}
            </Center></ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            <Center>
            {
            <Image
             borderRadius="full"
             boxSize="150px"
             src={user.pic}
             alt={user.name}
             />
           }
           </Center>

           <Text fontSize={{base:"20px",md:"20px"}}>
            <Center pt={4}>
            Email: {user.email}
            </Center>
              
           </Text>
            
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Center>
      </Modal>
      </>
    )
}

export default ProfileModal