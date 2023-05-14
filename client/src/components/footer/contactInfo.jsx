import {
  Box,
  Button,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function ContactInfo() {
  return (
    <VStack align={"flex-start"}>
      <ListHeader>{"Contact us"}</ListHeader>
      <Button
        p={0}
        size="md"
        height="48px"
        width="auto"
        variant="ghost"
        _hover={{ border: "2px solid #1C6FEB" }}
        leftIcon={<MdPhone color="black" size="20px" />}
      >
        +91-988888888
      </Button>
      <Button
        p={0}
        size="md"
        height="48px"
        width="auto"
        variant="ghost"
        _hover={{ border: "2px solid #1C6FEB" }}
        leftIcon={<MdEmail color="black" size="20px" />}
      >
        hello@abc.com
      </Button>
      <Button
        p={0}
        size="md"
        height="48px"
        width="auto"
        variant="ghost"
        _hover={{ border: "2px solid #1C6FEB" }}
        leftIcon={<MdLocationOn color="black" size="20px" />}
      >
        Karnavati, India
      </Button>
    </VStack>
  );
}
