import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "./product_popup";
import {
  AspectRatio,
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Button,
  ButtonGroup,
  Text,
  Stack,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";
import { addProduct } from "../../redux/cartRedux";

function ProductElement({ item }) {
  const [openProductCard, setOpenProductCard] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState({});
  /*   const [color, setColor] = useState("");
  const [size, setSize] = useState(""); */
  const dispatch = useDispatch();
  const { _id, name, image, brand, price } = item;

  const handleOpenProductCard = (id) => {
    setOpenProductCard(id);
  };

  const handleCloseProductCard = () => {
    setOpenProductCard(null);
  };
  const handleClick = () => {
    dispatch(addProduct({ ...order, quantity, name, price }));
  };

  return (
    <Card>
      <CardBody>
        <AspectRatio maxW="100%" ratio={1}>
          <Image src={image[0]} borderRadius="lg" />
        </AspectRatio>

        <Stack mt="6" spacing="2">
          <Heading size="xs">
            {name} - {brand}
          </Heading>
          <Text color="blue.600" fontSize="sm">
            {price}$
          </Text>
        </Stack>
      </CardBody>

      <Divider />

      <CardFooter align="center" justify="center">
        <ButtonGroup spacing="2">
          <Stack
            direction={{
              base: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            align="center"
            justify="center"
          >
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => handleOpenProductCard(_id)}
            >
              View
            </Button>
            {openProductCard === _id && (
              <ProductCard
                item={item}
                isOpen={true}
                onClose={handleCloseProductCard}
              />
            )}
            {/*      <Button
              onClick={handleClick}
              variant="solid"
              color="white"
              bg="#38A169"
            >
              Add to cart
            </Button> */}
          </Stack>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
export default ProductElement;
