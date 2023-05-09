import React from "react";
import { Box } from "@chakra-ui/react";
import ProductGrid from "../components/productPage_components/product_grid";
import ProductElement from "../components/productPage_components/product_element";
import ProductPopUpModal from "../components/productPage_components/product_popup";
import PrinterData from "../sampleData.json";

function Products_3dPrinters() {
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <ProductGrid>
        {PrinterData.map((item) => (
          <ProductElement item={item} />
        ))}
      </ProductGrid>
    </Box>
  );
}

export default Products_3dPrinters;
