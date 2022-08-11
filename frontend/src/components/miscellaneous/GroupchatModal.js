import React,{useState} from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button,Modal,ModalContent,ModalOverlay,ModalHeader,ModalCloseButton,ModalFooter,ModalBody,Lorem, IconButton, Text, useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'

const GroupchatModal = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers]=useState([])
  const[search,setSearch]=useState("")
  const[searchResult, setSearchResult]=useState([])
  const[loading,setLoading] = useState(false)
  const toast = useToast()
  const {user,chats,setChats}=ChatState()
  return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal isOpen={isOpen} onClose={onClose} backgroundColor={"#181D21"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GroupchatModal