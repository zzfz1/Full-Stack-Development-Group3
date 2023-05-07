import { 
    Button,
    IconButton,
    Modal,
    ModalHeader,
    ModalBody, 
    ModalFooter, 
    ModalOverlay, 
    ModalContent, 
    ModalCloseButton,
    Stack,
    Text
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

function ProductCard({item, isOpen, onClose})
{
  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{item.brand} - {item.model}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
          <div >
            <IconButton aria-label='slide left' icon={<ArrowBackIcon />} />
            <img src={item.img}/>
            <IconButton aria-label='slide right' icon={<ArrowForwardIcon />} />
          </div>
        <Stack>
          <Text>{item.description}</Text>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Add Cart</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
export default ProductCard;