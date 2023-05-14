import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { CartItem } from '../components/shopCart_components/cart-item'
import { CartOrderSummary } from '../components/shopCart_components/cart-orderSummary'
import CartRedux from '../redux/cartRedux'

function ShoppingCart()
{
  const orders = useSelector(state => state.cart.orders);
  const quantity = useSelector(state => state.cart.quantity);
  const total = useSelector(state => state.cart.total);
 
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
         <Stack
           spacing={{
             base: '8',
             md: '10',
           }}
           flex="2"
         >
           <Heading fontSize="2xl" fontWeight="extrabold">
             Shopping Cart ({quantity} items)
           </Heading>
   
           <Stack spacing="6">
             {orders.map((item) => (
               <CartItem key={item.id} {...item} />
             ))}
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