import React from "react";
import Hero from "../components/hero";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Products_3dPrinters from "./Products_3dPrinters";
import { useDispatch } from "react-redux";
import { publicProductsRequest } from "../utils/axios";
import { allProduct } from "../redux/productsRedux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicProductsRequest.get("/products");
        console.log(res.data);
        dispatch(allProduct(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />
      {/* <Products_3dPrinters /> */}
    </div>
  );
};

export default Home;
