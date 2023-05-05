import { 
    Button, 
    Modal,
    ModalHeader,
    ModalBody, 
    ModalFooter, 
    ModalOverlay, 
    ModalContent, 
    ModalCloseButton
} from '@chakra-ui/react'

function ProductCard({item, isOpen, onClose})
{
  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{item.brand} - {item.model}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <img src={item.img}/>
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