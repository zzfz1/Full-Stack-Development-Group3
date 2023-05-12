import { useState } from "react";
import { Button, ButtonGroup, Flex, IconButton, Text } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

const QuantityButton = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <Flex align="center">
      <Text mr={4} fontSize="lg">
        Quantity:
      </Text>
      <ButtonGroup size="sm">
        <IconButton
          aria-label="Minus"
          icon={<MinusIcon />}
          onClick={handleDecrement}
        />
        <Button variant="outline">{quantity}</Button>
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          onClick={handleIncrement}
        />
      </ButtonGroup>
    </Flex>
  );
};

export default QuantityButton;
