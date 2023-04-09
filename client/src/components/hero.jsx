import React from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

function Hero() {
  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
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
            <Button
              rounded={"full"}
              bg="green"
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Add to Card
            </Button>
            <Button color="white" rounded={"full"} bg="primary.500">
              View Product
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex
        border={"solid 2px yellow"}
        align="center"
        justify="cent
      "
      >
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          objectPosition={"center"}
          src="/images/hero3.png"
          border={"solid 2px red"}
        />
      </Flex>
    </Stack>
  );
}

export default Hero;
