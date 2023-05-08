import React, { useState, useEffect } from "react";
import SideBar from "./sidebar";
import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Settings from "./Settings";
import OrderHistory from "./orderHistory";
import AddressForm from "./addressForm";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [selectedNavItem, setSelectedNavItem] = useState("Address");
  console.log("the initial", selectedNavItem);
  const handleNavItemClick = (navItem) => {
    setSelectedNavItem(navItem);
    console.log("the selected", selectedNavItem);
  };

  return (
    <HStack>
      <SideBar onNavItemClick={handleNavItemClick} />
      <Box
        /*  bg={useColorModeValue("gray.50", "gray.800")} */
        h="100%"
        w="100%"
        p={0}
        m={0}
      >
        {selectedNavItem === "Settings" && <Settings />}
        {selectedNavItem === "History" && <OrderHistory />}
        {selectedNavItem === "Address" && <AddressForm />}
      </Box>
    </HStack>
  );
}

export default Profile;
