import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "./logo";
import Company from "./company";
import ContactInfo from "./contactInfo";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.300", "whiteAlpha.100")}
      bottom={"0"}
      right={0}
      left={0}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 2fr 1fr" }}
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
          <ContactInfo />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
