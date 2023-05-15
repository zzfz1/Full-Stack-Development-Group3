import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import ProductGrid from "../components/productPage_components/product_grid";
import ProductElement from "../components/productPage_components/product_element";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Products() {
  let products = useSelector((state) => state.products.setProducts);
  products=products?products:[]
  const searchParams = new URLSearchParams(useLocation().search);
  let category = searchParams.get("category");
  category = category ? category : "All";
  if (category !== "All") {
    products = products.filter((product) => {
      if (product.category) {
        return product.category.slug == category;
      }
    });
  }

  console.log("redux products", products);
  return products ? (
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
      <Heading fontSize={{ sm: "lg", md: "2xl", lg: "4xl" }} mb={"2%"}>
        {category}
      </Heading>
      <ProductGrid>
        {products.map((item) => (
          <ProductElement key={item._id} item={item} />
        ))}
      </ProductGrid>
    </Box>
  ) : (
    ""
  );
}

export default Products;
