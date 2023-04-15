import React from "react";
import Footer from "../components/footer/index";
import Hero from "../components/hero";
import { Text } from "@chakra-ui/react";
import Register from "../components/register";

const Home = () => {
  return (
    <div>
      {/*    <Hero /> */}
      <Register />
      <Footer />
    </div>
  );
};

export default Home;
