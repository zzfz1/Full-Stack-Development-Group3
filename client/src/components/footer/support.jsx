import { Link, Stack, Text } from "@chakra-ui/react"

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Support() {
  return (
    <Stack align={"flex-start"}>
      <ListHeader>Support</ListHeader>
      <Link href={"#"}>Help Center</Link>
      <Link href={"#"}>Terms of Service</Link>
      <Link href={"#"}>Legal</Link>
      <Link href={"#"}>Privacy Policy</Link>
    </Stack>
  )
}