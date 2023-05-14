import React from "react";
import Hero from "../components/hero";
import { Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Products_3dPrinters from "./Products_3dPrinters";
import { useDispatch } from "react-redux";
import { publicProductsRequest } from "../utils/axios";
import { allProduct } from "../redux/productsRedux";
import Carousel from "../components/carousel";
import NewsCard from "../components/newCard";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Products_3dPrinters /> */}
      <Carousel />
      <Stack
        justify={"center"}
        align={"center"}
        p={8}
        direction={["column", "column", "row"]}
        mb="10rem"
      >
        <NewsCard
          image={
            "https://c-3d.niceshops.com/upload/image/banner_element/original/default/22810_b0d71d74.363x0.jpg"
          }
          title={"Nozzle for every application"}
          text={
            "Discover the popular 3D printer kit with high-quality components from LDO Motors.The 3D printers from Elegoo impress with their great price/performance ratio."
          }
        />
        <NewsCard
          image={
            "https://c-3d.niceshops.com/upload/image/banner_element/original/default/23918_72f99d0c.363x0.jpg"
          }
          title={"Filaments by fillamentum!"}
          text={
            "Filaments by fillamentum!The high-quality range by fillamentum covers a wide range of materials and is characterised by its diverse range of colours."
          }
        />
        <NewsCard
          image={
            "https://c-3d.niceshops.com/upload/image/banner_element/original/default/27499_3943cd44.363x0.jpg"
          }
          title={"Our 3D Printers"}
          text={
            "The 3D printers from Elegoo impress with their great price/performance ratio. Whether FDM or resin printing - you are well advised to choose the products from Elegoo!"
          }
        />
      </Stack>
    </div>
  );
};

export default Home;
