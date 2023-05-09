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
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handleOpenProductCard = (id) => {
    setOpenProductCard(id);
  };

  const handleCloseProductCard = () => {
    setOpenProductCard(null);
  };
  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Card>
      <CardBody>
        <AspectRatio maxW="100%" ratio={1}>
          <Image src={item.images[0]} borderRadius="lg" />
        </AspectRatio>

        <Stack mt="6" spacing="2">
          <Heading size="sm">
            {item.brand} - {item.model}
          </Heading>
          <Text color="blue.600" fontSize="sm">
            {item.price}$
          </Text>
        </Stack>
      </CardBody>

      <Divider />

      <CardFooter>
        <ButtonGroup spacing="2">
          <Stack
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
          >
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => handleOpenProductCard(item.id)}
            >
              View
            </Button>
            {openProductCard === item.id && (
              <ProductCard
                item={item}
                isOpen={true}
                onClose={handleCloseProductCard}
              />
            )}
            <Button onClick={handleClick} variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </Stack>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
export default ProductElement;
