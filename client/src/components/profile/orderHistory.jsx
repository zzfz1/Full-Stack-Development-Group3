import {
  Table,
  TableCaption,
  TableContainer,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Tfoot,
  Flex,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

function OrderHistory() {
  const myOrders = useSelector((state) => state.orders.myOrders);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!myOrders) {
      navigate("/Login");
    }
  }, []);
  return (
    <Box p={6} m={0} h={"100%"} overflowY={"auto"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mb={"2%"}
      >
        <Heading
          fontSize={{ sm: "lg", md: "2xl", lg: "4xl" }}
          textAlign={"center"}
        >
          Order History
        </Heading>
      </Flex>
      {myOrders ? (
        myOrders.map((order) => (
          <Box mt={5} key={order._id}>
            <Heading fontSize={{ sm: "sm", md: "md", lg: "lg" }}>
              {new Date(order.createdAt).toLocaleDateString()}
            </Heading>
            <TableContainer maxW={"100%"} overflowX="auto">
              <Table
                maxW={"100%"}
                size={{ sm: "sm", md: "md", lg: "lg" }}
                variant="striped"
                colorScheme="teal"
              >
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>quantity</Th>
                    <Th isNumeric>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.orderItems.map((orderItem) => (
                    <Tr key={orderItem.name}>
                      <Td>
                        <img
                          src={orderItem.image}
                          alt="Product 2"
                          width="50px"
                          height="50px"
                        />
                        {orderItem.name}
                      </Td>
                      <Td>{orderItem.qty}</Td>
                      <Td isNumeric>{orderItem.price}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>
          </Box>
        ))
      ) : (
        <></>
      )}
    </Box>
  );
}

export default OrderHistory;
