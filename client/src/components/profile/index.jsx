import React, { useState, useEffect } from "react";
import SideBar from "./sidebar";
import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Settings from "./Settings";
import OrderHistory from "./orderHistory";
import AddressList from "./addressList";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [selectedNavItem, setSelectedNavItem] = useState("History");
  console.log("the initial", selectedNavItem);
  const handleNavItemClick = (navItem) => {
    setSelectedNavItem(navItem);
    console.log("the selected", selectedNavItem);
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <SideBar onNavItemClick={handleNavItemClick} />
      <Box
        bg={useColorModeValue("gray.50", "gray.800")}
        h="85vh"
        minW="85vw"
        maxW={"90vw"}
        p={0}
        ml={0}
      >
        {selectedNavItem === "Settings" && <Settings />}
        {selectedNavItem === "History" && <OrderHistory />}
        {selectedNavItem === "Address" && <AddressList />}
      </Box>
    </Flex>
  );
}

export default Profile;
