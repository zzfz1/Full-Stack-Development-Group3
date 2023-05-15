import {
  Box,
  Flex,
  Text,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";

export const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

export const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack
      spacing={4}
      onClick={(e) => {
        if (children) {
          e.stopPropagation();
          onToggle();
        }
      }}
    >
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const MobileNav = ({ user, cartItemCount, links, quantity }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {links.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}

      <Stack w="3rem">
        <IconButton
          icon={<FiShoppingCart size="2rem" />}
          name="shopping-cart"
          size="lg"
          /*  onClick={handleAddToCart} */
          bg="none"
          w="100"
          display={{ md: "none" }}
        ></IconButton>
        {quantity > 0 && (
          <Box position="relative">
            <Badge
              borderRadius="full"
              color="white"
              px="2"
              py="1"
              bg="primary.500"
              position="absolute"
              top="-65px"
              left="22px"
            >
              {quantity}
            </Badge>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
