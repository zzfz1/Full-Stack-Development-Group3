import React from "react";
import Header from "../components/header/navbar";
import Footer from "../components/footer/index";
import Hero from "../components/hero";
import { Text } from "@chakra-ui/react";
import Products_3dPrinters from "./Products_3dPrinters";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products_3dPrinters />
    </div>
  );
};

export default Home;
