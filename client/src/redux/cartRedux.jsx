import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const CartReducer = createSlice({
  name: "cart",
  initialState: {
    orders: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const quantityPice = action.payload.quantity * action.payload.price;
      state.quantityPrice = quantityPice;

      state.total += action.payload.price * action.payload.quantity;
      let theSame = false;
      state.orders.forEach((order) => {
        if (order._id === action.payload._id) {
          if (_.isEqual(order.selectedValues, action.payload.selectedValues)) {
            order.quantity += action.payload.quantity;
            theSame = true;
          }
        }
      });
      if (!theSame) {
        state.orders.push(action.payload);
        state.quantity += 1;
      }
    },
    deleteProduct: (state, action) => {
      console.log("payload", action.payload);
      const filteredArr = state.orders.filter(
        (item) =>
          item._id != action.payload._id ||
          !_.isEqual(item.selectedValues, action.payload.selectedValues)
      );
      state.orders = filteredArr;
      state.quantity -= 1;
      state.total -= action.payload.quantity * action.payload.price;
    },
    changeProductQuantity: (state, action) => {
      const amount = action.payload.amount;
      const selectedValues = action.payload.selectedValues;
      const _id = action.payload._id;
      state.orders.forEach((order) => {
        if (
          _id === order._id &&
          _.isEqual(selectedValues, order.selectedValues)
        ) {
          order.quantity += amount;
          state.total += amount * order.price;
        }
      });
    },
    clearArray: (state) => {
      state.orders = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, clearArray, changeProductQuantity } =
  CartReducer.actions;

export default CartReducer.reducer;
