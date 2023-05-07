import React, { useState } from "react";
import SideBar from "./sidebar";
import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import Settings from "./Settings";
import OrderHistory from "./orderHistory";
import AddressForm from "./addressForm";

function Profile() {
  const [selectedNavItem, setSelectedNavItem] = useState("address");

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
