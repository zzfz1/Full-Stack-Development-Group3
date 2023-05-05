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
import { DesktopSubNav, MobileNavItem } from "./subNav";
import { BsPersonCircle } from "react-icons/bs";

const links = [
  {
    label: "Homepage",
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
  {
    label: "Checkout",
    path: "/checkout",
    href: "#",
  },
];
export default function WithSubnavigation() {
  const user = true;
  const { isOpen, onToggle } = useDisclosure();

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
              class="img-fluid"
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
                href={"#"}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"primary.500"}
                href={"#"}
                _hover={{
                  bg: "primary.700",
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <IconButton
              icon={<BsPersonCircle size="2rem" />}
              aria-label="User profile"
            />
          )}
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav user={user} />
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

const MobileNav = ({ user }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {links.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {!user ? (
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"primary.500"}
          href={"#"}
          _hover={{
            bg: "primary.700",
          }}
        >
          Sign Up
        </Button>
      ) : (
        <div></div>
      )}
    </Stack>
  );
};
