import 
{ 
  Box,
  Button,
  ButtonGroup,
  Flex,
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
} from '@chakra-ui/react';
import Slider from './product_popup_slider';

function ProductCard({item, isOpen, onClose})
{
  const images = item.images;

  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    
    <ModalOverlay />

      <ModalContent>

        <ModalHeader>{item.brand} - {item.model}</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>

          <Slider images = {images}/>

          <Text>{item.description}</Text>

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