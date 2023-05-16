import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Heading,
  ModalCloseButton,
  Flex,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddressForm from "../components/profile/addressForm";
import { useSelector } from "react-redux";
import { CheckoutSummary } from "../components/checkout/CheckoutSummary";

export default function Checkout() {
  const addresses = useSelector(
    (state) => state.user.currentUser.shippingAddress
  );
  const orderItems = useSelector((state) => state.cart.orders);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = useSelector((state) => state.user.currentUser._id);
  const total = useSelector((state) => state.cart.total);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };
  const handleOpenForm = () => {
    setIsModalOpen(true);
  };
  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  return (
    <Box padding="5" minH={"80vh"}>
      <Heading mb="5">Checkout</Heading>
      <FormControl id="address">
        <Flex
          mb={"5"}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormLabel>Shipping Address</FormLabel>
          <Button onClick={handleOpenForm} whiteSpace="normal">
            Create a New One
          </Button>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {addresses.map((address, index) => (
            <Box
              key={index}
              p={5}
              shadow="md"
              borderWidth={selectedAddress === address ? "2px" : "1px"}
              borderRadius="md"
              onClick={() => handleSelectAddress(address)}
              cursor="pointer"
              borderColor={
                selectedAddress === address ? "blue.500" : "gray.200"
              }
            >
              <Table
                variant="striped"
                colorScheme="teal"
                size={{ sm: "sm", md: "md" }}
              >
                <Tbody>
                  <Tr>
                    <Th>First Name</Th>
                    <Td>{address.firstName}</Td>
                  </Tr>
                  <Tr>
                    <Th>Last Name</Th>
                    <Td>{address.lastName}</Td>
                  </Tr>
                  <Tr>
                    <Th>Street Address</Th>
                    <Td>{address.streetAddress}</Td>
                  </Tr>
                  <Tr>
                    <Th>Apartment Number</Th>
                    <Td>{address.apartmentNumber || "N/A"}</Td>
                  </Tr>
                  <Tr>
                    <Th>City</Th>
                    <Td>{address.city}</Td>
                  </Tr>
                  <Tr>
                    <Th>Postal Code</Th>
                    <Td>{address.postalCode}</Td>
                  </Tr>
                  <Tr>
                    <Th>Country</Th>
                    <Td>{address.country}</Td>
                  </Tr>
                  <Tr>
                    <Th>Phone Number</Th>
                    <Td>{address.phoneNumber || "N/A"}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          ))}
        </SimpleGrid>
      </FormControl>
      <Box mt={"5"}>
        <CheckoutSummary total={total}></CheckoutSummary>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleCloseForm}>
        <ModalOverlay />
        <ModalContent maxW={"80vw"}>
          <ModalCloseButton />
          <ModalBody>
            <AddressForm userID={userID} onClose={handleCloseForm} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseForm}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
