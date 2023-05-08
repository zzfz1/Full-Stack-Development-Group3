import {
  Box,
  VStack,
  Heading,
  SimpleGrid,
  ButtonGroup,
  Button,
  Divider,
  useColorModeValue,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import AddressForm from "./addressForm";
import ConfirmModal from "./confirm";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { loginSuccess } from "../../redux/userRedux";
import { useMediaQuery } from "@chakra-ui/react";

const ShippingAddressList = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state) => state.user.currentUser.shippingAddress
  );
  const userID = useSelector((state) => state.user.currentUser._id);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMd] = useMediaQuery("(max-width: 62em)");
  const [islg] = useMediaQuery("(max-width: 80em)");

  const addressesPerPage = isMd ? 1 : islg ? 2 : 3;

  const indexOfLastAddress = currentPage * addressesPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressesPerPage;
  const currentAddresses = addresses.slice(
    indexOfFirstAddress,
    indexOfLastAddress
  );

  const totalPages = Math.ceil(addresses.length / addressesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [addressesPerPage, totalPages, currentPage]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removingAddress, setRemovingAddress] = useState("");

  const handleOpenModal = (id) => {
    setIsModalOpen(true);
    setRemovingAddress(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function removeAddress() {
    const userInfo = await axios.delete(
      `http://localhost:3000/api/users/address/${userID}/${removingAddress}`,
      {
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(userInfo.data));
    handleCloseModal();
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState("");

  const handleOpenForm = (address) => {
    setIsEditing(true);
    setEditingAddress(address);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  return (
    <Box p={6} bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack spacing={6} alignItems="start">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Shipping Addresses</Heading>
          <Button onClick={() => handleOpenForm({})}>Create a New One</Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={10}>
          {currentAddresses.map((address, index) => (
            <Box
              key={index}
              p={5}
              borderWidth={1}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              borderRadius="md"
              position="relative"
              maxWidth="100%"
              overflowX="auto"
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
              <Divider my={3} />
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={() => handleOpenForm(address)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                ml={3}
                onClick={() => handleOpenModal(address._id)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </SimpleGrid>
        <ButtonGroup>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </ButtonGroup>
      </VStack>
      <ConfirmModal
        message={"Are you sure about deleting this address?"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={removeAddress}
      />
      <Modal isOpen={isEditing} onClose={handleCloseForm}>
        <ModalOverlay />
        <ModalContent maxW={"80vw"}>
          <ModalCloseButton />
          <ModalBody>
            <AddressForm
              originalAddress={editingAddress}
              userID={userID}
              onClose={handleCloseForm}
            />
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
};

export default ShippingAddressList;
