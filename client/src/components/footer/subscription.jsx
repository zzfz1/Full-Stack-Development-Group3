import { IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Subscribe() {
  return (
    <Stack align={"flex-start"}>
      <ListHeader>Stay up to date</ListHeader>
      <Stack direction={"row"}>
        <Input
          placeholder={"Your email address"}
          // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          border={0}
          _focus={{
          bg: "whiteAlpha.300",
          }}
        />
        <IconButton
          // bg={useColorModeValue("green.400", "green.800")}
          // color={useColorModeValue("white", "gray.800")}
          _hover={{
            bg: "green.600",
          }}
          aria-label="Subscribe"
          icon={<BiMailSend />}
        />
      </Stack>
    </Stack>
  )
}