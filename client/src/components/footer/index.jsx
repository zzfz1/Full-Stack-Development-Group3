import { Box, Container, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Logo from "./logo";
import SocialMedia from "./socialMedia";
import Company from "./company";
import Support from "./support";
import Subscribe from "./subscription";

export default function Footer() {
  return (
    <Box bg={"gray.300"} bottom={"0"} right={0} left={0}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Logo />
            <Text fontSize={"sm"}>
              © 2023 HKR FSC Group-3. All rights reserved
            </Text>
            <SocialMedia />
          </Stack>

          <Company />
          <Support />
          <Subscribe />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
