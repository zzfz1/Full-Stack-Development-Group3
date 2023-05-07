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
      "data:image/jpeg;base64,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",

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
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
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
