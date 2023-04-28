import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Box,
  VStack,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { Link as ChakraLink } from "@chakra-ui/react";

function CheckEmail(props) {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center display={""}>
          <VStack>
            <Box pb={5}>
              <img src="/images/emailsend.png" alt="Animated icon" />
            </Box>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Check your email
            </Heading>
          </VStack>
        </Center>
        <Center>
          <VStack>
            <Box
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              We have sent a password reset link to
            </Box>
            <Box
              mt={0}
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.400")}
            >
              {props.email}
            </Box>
          </VStack>
        </Center>

        <Stack spacing={6} pt={2}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Open email app
          </Button>
          <Center
            pt={2}
            fontSize={{ base: "xs" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            <Box pr="1">Didn't receive the email?</Box>{" "}
            <ChakraLink color="primary.500">Click to resend</ChakraLink>
          </Center>
          <Stack pt={1} align="center">
            <ChakraLink
              display="flex"
              alignItems="center"
              href="#"
              justifyContent="space-around"
              color="primary.500"
            >
              <Box pr="2">
                <BiArrowBack />
              </Box>
              Back to Login
            </ChakraLink>
          </Stack>
          ''
        </Stack>
      </Stack>
    </Flex>
  );
}

export default CheckEmail;
