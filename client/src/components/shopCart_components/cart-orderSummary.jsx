import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./cart-priceTag";
import { useDispatch, useSelector } from "react-redux";
import { clearArray } from "../../redux/cartRedux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = (props) => {
  const { total } = props;
  const items = useSelector((state) => state.cart.orders);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      if (items.length === 0) {
        toast.error("You need to add at least 1 item!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else navigate("/checkout");
    } else {
      toast.error("Oop! you need to login", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(total)} />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </Stack>
  );
};
