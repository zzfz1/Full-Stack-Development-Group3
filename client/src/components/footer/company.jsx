import { Link, Stack, Text } from "@chakra-ui/react"

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Company() {
  return (
    <Stack align={"flex-start"}>
      <ListHeader>Company</ListHeader>
      <Link href={"#"}>About us</Link>
      <Link href={"#"}>Contact us</Link>
      <Link href={"#"}>Products</Link>
    </Stack>
    
  )
}