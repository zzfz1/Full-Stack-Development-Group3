import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const CheckoutSummary = (props) => {
  const { total } = props;
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.orders);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, []);

  const handleCheckout = () => {
    if (user) {
      dispatch(clearArray());
      toast.success("Thank your for the purchase", {
        position: toast.POSITION.TOP_CENTER,
      });
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
        <CheckoutSummaryItem label="Subtotal" value={formatPrice(total)} />
        <CheckoutSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </CheckoutSummaryItem>
        <CheckoutSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </CheckoutSummaryItem>
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
        onClick={handleCheckout}
      >
        Pay
      </Button>
    </Stack>
  );
};

const CheckoutSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text
        fontWeight="medium"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

function formatPrice(value, opts = {}) {
  const { locale = "en-US", currency = "USD" } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}
