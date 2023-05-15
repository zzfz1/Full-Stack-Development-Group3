import { createSlice } from "@reduxjs/toolkit";

const CartReducer = createSlice({
  name: "cart",
  initialState: {
    orders: [],
    quantity: 0,
    total: 0,
  },
  reducers:
  {
    addProduct: (state, action) => {
      state.quantity = state.quantity+1;
      state.orders.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      console.log("fuuck" + state.action);

    },
    clearArray:  (state) => {
      state.orders = [];
      state.quantity = 0;
      state.total = 0
    }
  },
});

export const { addProduct, deleteProduct, clearArray} = CartReducer.actions;
export default CartReducer.reducer;
