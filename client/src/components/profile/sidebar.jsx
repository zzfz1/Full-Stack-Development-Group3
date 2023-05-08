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
  useColorModeValue,
  Button,
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavItem from "./navItem";
import { loginSuccess } from "../../redux/userRedux";
import { useSelector } from "react-redux";

function SideBar({ onNavItemClick }) {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [navSize, changeNavSize] = useState(isSmallScreen ? "small" : "large");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    changeNavSize(isSmallScreen ? "small" : "large");
    if (!user) {
      navigate("/");
    }
  }, [isSmallScreen, user]);

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
      /*  bg={useColorModeValue("white", "gray.900")} */
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
          onNavItemClick={onNavItemClick}
          description="This is the description for the dashboard."
        />
        <NavItem
          navSize={navSize}
          onNavItemClick={onNavItemClick}
          icon={FiPackage}
          title="History"
        />

        <NavItem
          navSize={navSize}
          icon={FiSettings}
          title="Settings"
          onNavItemClick={onNavItemClick}
        />
        {/*      <Button onClick={() => onNavItemClick("order")}>button</Button> */}
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
          <Button onClick={() => dispatch(loginSuccess(null))}>
            <Icon as={BiLogOut} fontSize="xl" />
            <Flex
              flexDir="column"
              ml={4}
              display={navSize == "small" ? "none" : "flex"}
            >
              <Heading as="h3" size="sm">
                Logout
              </Heading>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SideBar;
