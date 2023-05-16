import { CloseButton, Flex, Link, Button,ButtonGroup, IconButton} from '@chakra-ui/react'
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { PriceTag } from './cart-priceTag'
import { CartProductMeta } from './cart-productMeta'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { changeProductQuantity } from '../../redux/cartRedux';



const QuantitySelector=({quantity, onIncrement,onDecrement}) => {
  // const [summedPrice, setPrice] = useState(quantityPrice);
  
  // const handleIncrement = () => {
  //   setQuantity(selectedQuantity + 1);
  //   setPrice(summedPrice + price);
  //   onPriceChange(quantityPrice + price);
  // };

  return (
    <ButtonGroup size="sm">
      <IconButton
        size="md"
        aria-label="Minus"
        icon={<MinusIcon />}
        onClick={onDecrement}
      />
      <Button size="md" variant="outline">
        {quantity}
      </Button>
      <IconButton
        size="md"
        aria-label="Add"
        icon={<AddIcon />}
        onClick={onIncrement}
      />
    </ButtonGroup>
  );

}

function CartItem ({item, onDelete}) {
  const {
    _id,
    name,
    image,
    selectedValues,
    price,
    description,
    currency,
    quantity
  } = item;
  
  const dispatch=useDispatch();

  const handleDelete = () => {
    onDelete(_id, quantity, price); 
  };
  
  const [quantityPrice, setQuantityPrice] = useState(price * quantity);
  const [currentQuantity, setCurrentQuantity]=useState(quantity);

  console.log(quantityPrice);

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      const amount=-1;
      setCurrentQuantity(currentQuantity - 1);
      setQuantityPrice(quantityPrice - price);
      dispatch(changeProductQuantity({_id,amount,selectedValues}))
    }
  };

  const handleIncrement = () => {
    const amount= 1;
    setCurrentQuantity(currentQuantity + 1);
    setQuantityPrice(quantityPrice + price);
    dispatch(changeProductQuantity({_id,amount,selectedValues}))
  };

  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={image}
      />
  
      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{base: 'none', md: 'flex'}}>

        <QuantitySelector quantity={currentQuantity} price = {price} quantityPrice = {quantityPrice} onDecrement={handleDecrement} onIncrement={handleIncrement}/>
        <PriceTag price={quantityPrice} currency={currency} />
        
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={handleDelete} />
      
      </Flex>

      {/* Mobile */}
      <Flex mt="4" align="center" width="full" justify="space-between" display={{base: 'flex', md: 'none'}}>
        
        <QuantitySelector quantity={currentQuantity} price = {price} quantityPrice = {quantityPrice} onDecrement={handleDecrement} onIncrement={handleIncrement} />
        <Link fontSize="sm" textDecor="underline" onClick={handleDelete}>
          Delete
        </Link>
        
        <PriceTag price={quantityPrice} currency={currency} />
      </Flex>
    </Flex>
  );
}
export default CartItem;