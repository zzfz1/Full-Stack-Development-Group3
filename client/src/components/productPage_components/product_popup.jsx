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
  Select,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
} from "@chakra-ui/react";
import Slider from "./product_popup_slider";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import Rating from "./product_rating";
import Review from "./product_rating";

function ProductCard({ item, isOpen, onClose }) {
  const images = item.image;
  const test = [];
  test.push(images);
  console.log("rating", item.rating);

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
          {/* the review section */}
          <Review rating={item.rating} numReviews={item.numReviews} />
          {item.properties ? (
            item.properties.map((property) => (
              <Select
                mt="1rem"
                key={property.categoryProperty}
                size="md"
                placeholder={"colro"}
              >
                {property.values.map((value) => (
                  <option key={value.value} value="option1">
                    {value.value}
                  </option>
                ))}
              </Select>
            ))
          ) : (
            <Text>dot have properties</Text>
          )}
          {/* the quantity section */}
          <Flex align="center" mt="2rem">
            <Text mr={4} fontSize="lg">
              Quantity:
            </Text>
            <ButtonGroup size="sm">
              <IconButton
                size="md"
                aria-label="Minus"
                icon={<MinusIcon />}
                /* onClick={handleDecrement} */
              />
              <Button size="md" variant="outline">
                {2}
              </Button>
              <IconButton
                size="md"
                aria-label="Add"
                icon={<AddIcon />}
                /* onClick={handleIncrement} */
              />
            </ButtonGroup>
          </Flex>
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
