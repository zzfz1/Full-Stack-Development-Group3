import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiPackage,
  FiSettings,
} from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { IoPawOutline } from "react-icons/io5";
import { useMediaQuery } from "@chakra-ui/react";
import NavItem from "./navItem";

function SideBar({ onNavItemClick }) {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [navSize, changeNavSize] = useState(isSmallScreen ? "small" : "large");

  useEffect(() => {
    changeNavSize(isSmallScreen ? "small" : "large");
  }, [isSmallScreen]);
  const menu = [
    {
      title: "Home",
      icons: "FiHome",
    },
  ];
  return (
    <Flex
      /*     border="red solid 2px" */
      pos="sticky"
      left="1"
      h="100%"
      /*       boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)" */
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <VStack
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Address"
          description="This is the description for the dashboard."
        />
        <NavItem
          navSize={navSize}
          onNavItemClick={onNavItemClick}
          icon={FiPackage}
          title="Order History"
        />

        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
      </VStack>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          {/* <Avatar size="sm" src="avatar-1.jpg" /> */}
          <Icon as={BiLogOut} fontSize="xl" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              logout
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SideBar;
