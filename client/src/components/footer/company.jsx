import { Link, Stack, Text } from "@chakra-ui/react";

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
      <Link href={"/"}>
        <Text>Home</Text>
      </Link>
      <Link href={"products"}>Products</Link>
      <Link href={"/contact"}>Contact </Link>
      <Link href={"/about"}>About us</Link>
    </Stack>
  );
}
