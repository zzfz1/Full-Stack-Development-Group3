import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import ProductElement from "./productPage_components/product_element";
import { Box, Center, Heading, Stack } from "@chakra-ui/react";

const Carousel = () => {
  let products = useSelector((state) => state.products.setProducts);
  //console.log("the product ", products);
  const items = products.filter((product) => product.trending == true);
  console.log("the item is: ", items);

  var settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Heading mb={8}> Trending Product </Heading>
      <box b={8} direction={"row"} align={"center"}>
        <Slider {...settings}>
          {items.map((item) => (
            <Box key={item._id} m={0} p={0}>
              <ProductElement item={item} />
            </Box>
          ))}
        </Slider>
      </box>
    </>
  );
};

export default Carousel;
