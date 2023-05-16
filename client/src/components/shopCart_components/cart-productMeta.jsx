import {
  Box,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

export const CartProductMeta = (props) => {
  const { name, description, image, selectedValues } = props;
  console.log("the values", selectedValues);
  return (
    <Stack direction={["column", "row"]} spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          {Object.keys(selectedValues).map((key) => (
            <Text
              color={mode("gray.600", "gray.400")}
              fontWeight={"4rem"}
              fontSize="sm"
              key={key}
            >
              {key}: {selectedValues[key]}
            </Text>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
