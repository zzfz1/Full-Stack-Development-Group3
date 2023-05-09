import React from "react";
import Hero from "../components/hero";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Products_3dPrinters from "./Products_3dPrinters";
import { useDispatch } from "react-redux";
import { publicProductsRequest } from "../utils/axios";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicProductsRequest.get("/products");
        //dispatch({ type: "SET_PRODUCTS", payload: res.data });
        console.log("all products", res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <Products_3dPrinters />
    </div>
  );
};

export default Home;
