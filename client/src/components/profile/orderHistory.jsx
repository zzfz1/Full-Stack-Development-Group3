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
      "https://cdn.thewirecutter.com/wp-content/media/2022/09/3dprinters-2048px-dave-gershgorn-IMG_9844.jpg?auto=webp&quality=75&width=1024",
    price: 29,
  },
];
function OrderHistory() {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>quantity</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((product) => (
            <Tr>
              <Td>{product.name}</Td>
              <Td>{product.qty}</Td>
              <Td isNumeric>{product.price}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
}

export default OrderHistory;
