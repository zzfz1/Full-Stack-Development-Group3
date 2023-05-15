import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const NewsCard = ({ title, text, image, link }) => {
  return (
    <Card maxW="sm" bg="gray.300">
      <CardBody h={"18rem"}>
        <Image
          src={image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          h="50%"
        />

        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{text}</Text>
          <Button as={"a"} href={link} variant="ghost" colorScheme="blue">
            See what we have
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NewsCard;
