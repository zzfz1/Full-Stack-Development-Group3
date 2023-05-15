import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useSelector, useDispatch , Provider} from 'react-redux'
import CartItem from '../components/shopCart_components/cart-item'
import { CartOrderSummary } from '../components/shopCart_components/cart-orderSummary'
import { deleteProduct, clearArray } from "../redux/cartRedux"

function ShoppingCart()
{
  const {orders, quantity, total,} = useSelector(state => state.cart) 
  const dispatch = useDispatch();

  const EmptyArray = () =>{
    console.log("array is emptied!")
    dispatch(clearArray())
  }

  /* const handleDeleteItem = (id) => {
    console.log(`deleted element ${id}`)
    dispatch(deleteProduct(id));
  }; */

  return(
     <Box
       maxW={{
         base: '3xl',
         lg: '7xl',
       }}
       mx="auto"
       px={{
         base: '4',
         md: '8',
         lg: '12',
       }}
       py={{
         base: '6',
         md: '8',
         lg: '12',
       }}
     >
       <Stack
         direction={{
           base: 'column',
           lg: 'row',
         }}
         align={{
           lg: 'flex-start',
         }}
         spacing={{
           base: '8',
           md: '16',
         }}
       >
        <Stack spacing={{base: '8', md: '10',}} flex="2">
           
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({quantity} items)
          </Heading>
           
          <Button onClick={EmptyArray}>Empty Cart</Button>
   
          <Stack spacing="6">
            <Provider>
              {orders.map((item) => (
                <CartItem item = {item}/>
              ))}
            </Provider>
          </Stack>

         </Stack>
   
         <Flex direction="column" align="center" flex="1">
           
           <CartOrderSummary total = {total}/>
           <HStack mt="6" fontWeight="semibold">
             <p>or</p>
             <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
           </HStack>

         </Flex>
       </Stack>
     </Box>
  );
}
export default ShoppingCart;