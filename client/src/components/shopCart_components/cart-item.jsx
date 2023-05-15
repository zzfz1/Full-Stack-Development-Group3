import { CloseButton, Flex, Link, Button,ButtonGroup, IconButton} from '@chakra-ui/react'
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { PriceTag } from './cart-priceTag'
import { CartProductMeta } from './cart-productMeta'
import { useState } from "react";

const QuantitySelector=({quantity, price, onPriceChange}) => {
  
  const [selectedQuantity, setQuantity] = useState(quantity);
  const [summedPrice, setPrice] = useState(price);

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setQuantity(selectedQuantity - 1);
      setPrice(summedPrice - price);
      onPriceChange(summedPrice - price);
    }
  };
  const handleIncrement = () => {
    setQuantity(selectedQuantity + 1);
    setPrice(summedPrice + price);
    onPriceChange(summedPrice + price);
  };

  return (
    <ButtonGroup size="sm">
      <IconButton
        size="md"
        aria-label="Minus"
        icon={<MinusIcon />}
        onClick={handleDecrement}
      />
      <Button size="md" variant="outline">
        {selectedQuantity}
      </Button>
      <IconButton
        size="md"
        aria-label="Add"
        icon={<AddIcon />}
        onClick={handleIncrement}
      />
    </ButtonGroup>
  );

}

function CartItem ({item, onDelete}) {
  const {
    _id,
    name,
    image,
    price,
    description,
    currency,
    quantity,
  } = item;
  
  const handleDelete = () => {
    onDelete(_id, quantity, price); 
  };

  const [cartPrice, setCartPrice] = useState(price);
  const handlePriceChange = (newPrice) => {
    setCartPrice(newPrice); // Update the cartPrice state with the new price
  }

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

        <QuantitySelector quantity={quantity} price = {price} onPriceChange={handlePriceChange}/>
        <PriceTag price={cartPrice} currency={currency} />
        
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={handleDelete} />
      
      </Flex>

      {/* Mobile */}
      <Flex mt="4" align="center" width="full" justify="space-between" display={{base: 'flex', md: 'none'}}>
        
        <QuantitySelector quantity={quantity} price = {price}/>
        <Link fontSize="sm" textDecor="underline" onClick={handleDelete}>
          Delete
        </Link>
        
        {/* <PriceTag price={price} currency={currency} /> */}
      </Flex>
    </Flex>
  );
}
export default CartItem;