import { Card, CardBody, CardFooter, Image, Divider, Button, ButtonGroup, Text, Stack, Heading, Center } from '@chakra-ui/react'
  
function ProductElement ({item})
{
    return (
      <Card maxW='12rem'  >

        <CardBody>
          <div size = "100%">
            <Image
              src={item.img}
              borderRadius='lg'
            />
          </div>
          <Stack mt='6' spacing='2'>
            <Heading size='sm'>{item.brand} - {item.model}</Heading>
            <Text color='blue.600' fontSize='sm'>
              {item.price}$
            </Text>
          </Stack>

        </CardBody>

        <Divider />
        
        <CardFooter >
          
          <ButtonGroup   spacing='2' maxW='12rem'>
          <Stack direction= {{base : "column", md : "row"}}  align = "center" justify="center">
            <Button  variant='solid' colorScheme='blue'>
              Buy now
            </Button>
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
  