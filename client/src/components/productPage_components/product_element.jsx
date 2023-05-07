import React,{useState} from "react";
import ProductCard from "./product_popup";
import { AspectRatio, Card, CardBody, CardFooter, Image, Divider, Button, ButtonGroup, Text, Stack, Heading, Flex, Box } from '@chakra-ui/react'
  
function ProductElement ({item})
{
  const [openProductCard, setOpenProductCard] = useState(null);
  
  const handleOpenProductCard = (id) =>
  {
    setOpenProductCard(id);
  }

  const handleCloseProductCard = () => {
    setOpenProductCard(null);
  };

    return (
      <Card>

        <CardBody>
        
          <AspectRatio maxW='100%' ratio={1}>
            <Image
              src={item.img}
              borderRadius='lg'
            />
          </AspectRatio>

          <Stack mt='6' spacing='2'>
            <Heading size='sm'>{item.brand} - {item.model}</Heading>
            <Text color='blue.600' fontSize='sm'>
              {item.price}$
            </Text>
          </Stack>

        </CardBody>

        <Divider />
        
        <CardFooter>

          <ButtonGroup spacing='2'>
            <Stack direction= {{base : "column", md : "row"}}  align = "center" justify="center">
              <Button  variant='solid' colorScheme='blue' onClick={() => handleOpenProductCard(item.id)}>
                View
              </Button>
              {openProductCard === item.id && (<ProductCard item={item} isOpen={true} onClose={handleCloseProductCard} />)}
              <Button  variant='ghost' colorScheme='blue'>
                Add to cart
              </Button>
            </Stack>
          </ButtonGroup>
          
        </CardFooter>

      </Card>
    )
  }
export default ProductElement;
  