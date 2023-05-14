import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={4}
        textAlign="center"
      >
        <Heading fontSize={"4xl"} pb={3}>
          Oops! Something went wrong.
        </Heading>
        <Text fontSize={"xl"} pb={3}>
          <i>{error.message || error.statusText}</i>
        </Text>
        <Link to={`/`}>
          <Button colorScheme="primary" size="lg">
            Home
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
