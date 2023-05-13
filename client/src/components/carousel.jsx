import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import ProductElement from "./productPage_components/product_element";
import { Box, Heading } from "@chakra-ui/react";

const Carousel = () => {
  let products = useSelector((state) => state.products.setProducts);
  //console.log("the product ", products);
  const items = products.filter(
    (product) => product.category.name == "Filament"
  );
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
    <Box p={8}>
      <Heading> Filament </Heading>
      <Slider {...settings}>
        {items.map((item) => (
          <Box p={1}>
            <ProductElement item={item} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
