import { StarIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/react";

const Review = ({ rating, numReviews }) => {
  const MAX_RATING = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = MAX_RATING - fullStars - halfStars;

  return (
    <Stack mt="2rem" direction="row" spacing={1} align="center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} color="yellow.400" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <StarIcon key={i + fullStars} color="yellow.400" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={i + fullStars + halfStars} color="gray.400" />
      ))}
      <Text>({numReviews} Reviews)</Text>
    </Stack>
  );
};

export default Review;
