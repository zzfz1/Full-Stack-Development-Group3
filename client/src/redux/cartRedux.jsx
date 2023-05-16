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

      state.quantity += 1;
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
      }
    },
    deleteProduct: (state, action) => {
      console.log(
        "deleted ID: " +
          action.payload._id +
          ", Quantity: " +
          action.payload.quantity +
          ", Price: " +
          action.payload.price
      );
      const filteredArr = state.orders.filter(
        (item) => item._id != action.payload._id
      );
      state.orders = filteredArr;
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.quantity * action.payload.price;
    },
    clearArray: (state) => {
      state.orders = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, clearArray } = CartReducer.actions;
export default CartReducer.reducer;
