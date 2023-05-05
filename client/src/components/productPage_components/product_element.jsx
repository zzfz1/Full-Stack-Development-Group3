import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Link,
    Skeleton,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  //import { Rating } from './Rating'
  //import { FavouriteButton } from './FavouriteButton'
  
function ProductElement ({item})
{
    return (
      <Stack
        spacing={{
          base: '4',
          md: '5',
        }}
      >
        <Box position="relative">
          <AspectRatio ratio={3 / 3}>
            <Image
              src={item.img}
              alt={item.model}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={{
                base: 'md',
                md: 'xl',
              }}
            />
          </AspectRatio>
          {/* <FavouriteButton
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${name} to your favourites`}
          /> */}
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {item.model}
            </Text>
          </Stack>
          {/* <HStack>
            <Rating defaultValue={rating} size="sm" />
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              12 Reviews
            </Text>
          </HStack> */}
        </Stack>
        <Stack align="center">
          <Button colorScheme="blue" width="full">
            Add to cart
          </Button>
          <Link
            textDecoration="underline"
            fontWeight="medium"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            View Details
          </Link>
        </Stack>
      </Stack>
    )
  }
export default ProductElement;
  