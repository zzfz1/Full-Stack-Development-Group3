import {
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
  Text,
} from "@chakra-ui/react";
import Slider from "./product_popup_slider";

function ProductCard({ item, isOpen, onClose }) {
  const images = item.image;
  const test = [];
  test.push(images);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          {item.name} - {item.brand}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {images == Object ? <Slider images={test} /> : <img src={images} />}
          <Text mt="2rem">{item.description}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Add Cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default ProductCard;
