import React from "react";
import { Container, Heading, Text, Divider, Box, UnorderedList, ListItem } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Box sx={{}} padding={'1.5rem'}>
      <Heading as='h4' size='lg' noOfLines={1} paddingTop={'1rem'} align={'center'}>
        About Us
      </Heading>
      <Divider paddingTop={'1.5rem'} borderBottomColor={"black"} />
      <Heading as='h5' size='md' paddingTop={'1.5rem'}>
        More about this website
      </Heading>
      <Text fontSize='md' paddingTop={'1rem'}>
        Christmas3dp, a website developed by group-3 members for a FullStack Development Project, aims to provide affordable 3D printing parts and kits.
        We are committed to offering excellent customer support and maintaining full transparency.
        <br />When you purchase from Christmas3dp, you're not only getting high-quality 3D printing products but also contributing to someone's aspirations.
        We at Christmas3dp believe in delivering the best possible customer experience. Our commitment is to maintain full transparency in our pricing and product selection,
        backed by superior customer support. We understand that 3D printing can be a challenging hobby, and that's why we stand ready to assist at every juncture.
      </Text>
      <Divider paddingTop={'1.5rem'} borderBottomColor={"black"} />

      <Heading as='h5' size='md' paddingTop={'1.5rem'}>
        About the developers
      </Heading>
      <Text padding={'1rem 0rem 1rem'}>
        This website is developed for FullStack Development Project by group-3 members: Jasmin, Junxin, Murwan, Sebastian, Konstantin.
        Our team comprises of talented and a diverse group of individuals who are passionate about learning and creating new ideas and working to achieve excellence.
        Despite coming from various backgrounds and cultures, we are united by a shared objective to develop a website and practice our knowledge to and work to improve them.
      </Text>
      <Text>
        <b><i>Murwan Eisa: </i></b>
        <UnorderedList paddingLeft={'1.5rem'}>
          <ListItem>Server - Routes, Authorization, Reseting Password</ListItem>
          <ListItem>Client - Home page, Login page, Hero Section, Redux, Contact page, Profile page </ListItem>
        </UnorderedList>
      </Text>
      <Text>
        <b><i>Jasmin Akter Chowdhury: </i></b>
        <UnorderedList paddingLeft={'1.5rem'}>
          <ListItem>Server - Routes, Authorization</ListItem>
          <ListItem>Admin - Dashboard, User Analytics, Sales Analytics, Login page, User display</ListItem>
        </UnorderedList>
      </Text>
      <Text>
        <b><i>Junxin Zheng: </i></b>
        <UnorderedList paddingLeft={'1.5rem'}>
          <ListItem>Server - Routes, Authorization, Controllers, Invoice & Feedback Email, Reference Validation</ListItem>
          <ListItem>Client - Google Login, Profile Layout, React Router, Order History, Shipping Address</ListItem>
          <ListItem>Deployment - Firebase</ListItem>
        </UnorderedList>
      </Text>
      <Text>
        <b><i>Konstantin Filipov: </i></b>
        <UnorderedList paddingLeft={'1.5rem'}>
          <ListItem>Client - Navigation Bar, Products page, Product cart, Shopping cart, Google login</ListItem>
        </UnorderedList>
      </Text>
      <Text>
        <b><i>Sebastian Muenz</i></b>
        <UnorderedList paddingLeft={'1.5rem'}>
          <ListItem>Server -Categories, Category properties, and Product structure</ListItem>
          <ListItem>Admin - Structure & design, manage & sort catergory, category properties, Products, users and display orders</ListItem>
        </UnorderedList>
      </Text>

    </Box>
  );
};

export default AboutUs;