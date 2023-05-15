import { Stack, chakra, VisuallyHidden } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={
        {
          // bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }
      }
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function socialMedia() {
  return (
    <Stack direction={"row"} spacing={6}>
      <SocialButton label={"Twitter"} href={"#"}>
        <FaTwitter />
      </SocialButton>
      <SocialButton label={"YouTube"} href={"#"}>
        <FaYoutube />
      </SocialButton>
      <SocialButton label={"Instagram"} href={"#"}>
        <FaInstagram />
      </SocialButton>
    </Stack>
  );
}
