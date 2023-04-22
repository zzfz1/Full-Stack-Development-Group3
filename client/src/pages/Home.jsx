import React from "react";
import Footer from "../components/footer/index";
import Hero from "../components/hero";
import { Text } from "@chakra-ui/react";
import ResetPassword from "../components/resetPassword";
import SendEmail from "../components/sendEmail";

const Home = () => {
  return (
    <div>
      {/* <Hero /> */}
      <SendEmail />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
