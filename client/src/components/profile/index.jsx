import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import { useMediaQuery } from "@chakra-ui/react";
import NavItem from "./navItem";

function Profile() {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [navSize, changeNavSize] = useState(isSmallScreen ? "small" : "large");

  useEffect(() => {
    changeNavSize(isSmallScreen ? "small" : "large");
  }, [isSmallScreen]);

  return (
    <Flex
      pos="sticky"
      left="1"
      h="100%"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Dashboard"
          description="This is the description for the dashboard."
        />
        <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" />
        <NavItem navSize={navSize} icon={FiUser} title="Clients" />
        <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" />
        <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
        <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Sylwia Weller
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;
