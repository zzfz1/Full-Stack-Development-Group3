import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function InvalidLink() {
  return (
    <Box textAlign="center" my="10rem" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CloseIcon />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        The link token is invalid or expired
      </Heading>
      <Text color={"gray.500"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text>
    </Box>
  );
}

export default InvalidLink;
