import { CloseButton, Flex, Link, Button,ButtonGroup, IconButton} from '@chakra-ui/react'
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { PriceTag } from './cart-priceTag'
import { CartProductMeta } from './cart-productMeta'
import { useState } from "react";

const QuantitySelector=({quantity, price}) => {
  
  const [selectedQuantity, setQuantity] = useState(quantity);
  const [summedPrice, setPrice] = useState(price);

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setQuantity(selectedQuantity - 1);
      setPrice(summedPrice - price)
    }
  };
  const handleIncrement = () => {
    setQuantity(selectedQuantity + 1);
    setPrice(summedPrice + price);
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

function CartItem (props) {
  const {
    quantity,
    name,
    description,
    price,
    image,
    currency,
    onClickDelete
  } = props;

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

        <QuantitySelector quantity={quantity} price = {price}/>
        <PriceTag price={price} currency={currency} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={onClickDelete} />
      
      </Flex>

      {/* Mobile */}
      <Flex mt="4" align="center" width="full" justify="space-between" display={{base: 'flex', md: 'none'}}>
        
        <QuantitySelector quantity={quantity}/>
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
}
export default CartItem;