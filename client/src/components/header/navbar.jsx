import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  HStack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { DesktopSubNav, MobileNavItem, MobileNav } from "./subNav";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Badge, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Products",
    path: "/products",
    children: [
      {
        label: "3D Printers",
        href: "#",
      },
      {
        label: "3D printer hardware",
        href: "#",
      },
      {
        label: "Accessories",
        href: "#",
      },
    ],
  },
  {
    label: "About us",
    path: "/about_us",
    href: "#",
  },
  {
    label: "Contact",
    path: "/contact",
    href: "#",
  },
];
export default function WithSubnavigation() {
  const user = useSelector((state) => state.user.currentUser);
  const { isOpen, onToggle } = useDisclosure();
  const [cartItemCount, setCartItemCount] = useState(10);

  function handleAddToCart() {
    setCartItemCount(cartItemCount + 1);
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: 0 }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "none", md: "start" }}>
          <div>
            <img
              src="images/logo.png"
              className="img-fluid"
              width="50"
              height="50"
            />
          </div>
          <Flex display={{ base: "none", md: "flex" }} ml={10} mt={3}>
            <DesktopNav />
          </Flex>
        </Flex>

        <HStack justify={"flex-end"} direction={"row"} spacing={6}>
          {" "}
          {!user ? (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                color={"primary.700"}
                href={"/login"}
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Stack>
                <IconButton
                  icon={<FiShoppingCart size="2rem" />}
                  name="shopping-cart"
                  size="lg"
                  onClick={handleAddToCart}
                  _hover={{
                    bg: "gray.300",
                  }}
                  bg="none"
                  pt="2"
                  display={{ base: "none", md: "inline-flex" }}
                ></IconButton>
                {cartItemCount > 0 && (
                  <Box position="absolute" right="75px" top="-1px">
                    <Badge
                      borderRadius="full"
                      color="white"
                      p="1"
                      bg="primary.500"
                      display={{ base: "none", md: "inline-flex" }}
                    >
                      {cartItemCount}
                    </Badge>
                  </Box>
                )}
              </Stack>
              <IconButton
                as="a"
                icon={<BsPersonCircle size="2rem" />}
                aria-label="User profile"
                href="/profile"
              />
            </>
          )}
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav links={links} user={user} cartItemCount={cartItemCount} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {links.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
