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
  Stack,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const data = [
  {
    name: "printer",
    qty: 2,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/09/3dprinters-2048px-dave-gershgorn-IMG_9844.jpg?auto=webp&quality=75&width=1024",
    price: 29,
  },
  {
    name: "3D printer",
    qty: 8,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/09/3dprinters-2048px-dave-gershgorn-IMG_9844.jpg?auto=webp&quality=75&width=1024",
    price: 29,
  },
  {
    name: "Kopria",
    qty: 4,
    image:
      "https://images.unsplash.com/photo-1631016041959-0ed99b85fea7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

    price: 29,
  },
];
function OrderHistory() {
  return (
    <div>
      <Stack align={"center"} mb="2%">
        <Heading
          fontSize={{ sm: "lg", md: "2xl", lg: "4xl" }}
          textAlign={"center"}
        >
          Order History
        </Heading>
      </Stack>
      <TableContainer w={"100%"} overflowX="scroll">
        <Table w={"100%"} variant="striped" colorScheme="teal">
          <TableCaption>a list of your order history</TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>quantity</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product) => (
              <Tr key={product.name}>
                <Td>
                  <img
                    src={product.image}
                    alt="Product 2"
                    width="50px"
                    height="50px"
                  />
                  {product.name}
                </Td>
                <Td>{product.qty}</Td>
                <Td isNumeric>{product.price}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderHistory;
