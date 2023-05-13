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
  Badge,
} from "@chakra-ui/react";
import Slider from "./product_popup_slider";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import Rating from "./product_rating";
import Review from "./product_rating";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

function ProductCard({ item, isOpen, onClose }) {
  const { image, name, brand, price, properties } = item;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedValues, setSelectedValues] = useState({});

  const handleSelectChange = (property, value) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const handleSubmit = () => {
    // pass the selected values and quantity to the reducer function
    const data = {
      selectedValues,
      quantity,
    };
    console.log("the data is: ", data);
    // your reducer function here
    dispatch(addProduct({ ...data, quantity, name, price }));

    // close the modal
    onClose();
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  console.log("the images ", name);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          {name}{" "}
          <Badge variant="outline" color="primary.500">
            {brand}
          </Badge>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {image.length > 1 ? <Slider images={image} /> : <img src={image} />}
          <Text mt="2rem">{item.description}</Text>
          <Text mt="2rem" fontSize="2xl" fontWeight="bold">
            ${price.toFixed(2)}
          </Text>
          {/* the review section */}
          <Review rating={item.rating} numReviews={item.numReviews} />
          {properties.map((property) => {
            if (property.hasOwnProperty("categoryProperty")) {
              //check if the product has properties
              return (
                <Select
                  mt="1rem"
                  key={property.categoryProperty._id}
                  size="md"
                  placeholder={property.categoryProperty.key}
                  onChange={(e) =>
                    handleSelectChange(
                      property.categoryProperty.key,
                      e.target.value
                    )
                  }
                >
                  {property.values.map((value) => (
                    <option key={value._id} value={value.value}>
                      {value.value}
                    </option>
                  ))}
                </Select>
              );
            } else {
              return null;
            }
          })}
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
                onClick={handleDecrement}
              />
              <Button size="md" variant="outline">
                {quantity}
              </Button>
              <IconButton
                size="md"
                aria-label="Add"
                icon={<AddIcon />}
                onClick={handleIncrement}
              />
            </ButtonGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            variant="solid"
            color="white"
            bg="#38A169"
          >
            Add Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default ProductCard;
