import React, { useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ProductCard from "./productPage_components/product_popup";
import { useSelector } from "react-redux";

function Hero() {
  const [openProductCard, setOpenProductCard] = useState(false);
  let products = useSelector((state) => state.products.setProducts);
  products=products?products:[]
  //console.log("the product ", products);
  const item = products.filter(
    (product) => product._id == "645e513693a5bdc7030c8d47"
  );
  console.log("the item is: ", item);

  const handleCloseProductCard = () => {
    setOpenProductCard(false);
  };
  return (
    <Container
      as={Stack}
      maxW={"7xl"}
      minH={("50vh", "40vh")}
      direction={{ base: "column-reverse", md: "row" }}
      p={[0, 4, 6]}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              VzBot 330
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              High speed 3D printer!
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color="primary">
            The VzBoT is a high speed, moderately sized 3d Printer. Originally
            based on the TronXY X5SA / X5S Frame
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            {/*        <Button
              rounded={"full"}
              bg="green"
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Add to Card
            </Button> */}
            <Button
              onClick={() => setOpenProductCard(true)}
              color="white"
              rounded={"full"}
              bg="primary.500"
              _hover={{ bg: "primary.700" }}
            >
              View Product
            </Button>
            {openProductCard === true && (
              <ProductCard
                item={item[0]}
                isOpen={true}
                onClose={handleCloseProductCard}
              />
            )}
          </Stack>
        </Stack>
      </Flex>
      <Flex align="center" justify="center">
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          objectPosition={"center"}
          src="/images/hero3.png"
        />
      </Flex>
    </Container>
  );
}

export default Hero;
