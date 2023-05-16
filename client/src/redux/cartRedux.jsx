import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash"

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
      
      const quantityPice = action.payload.quantity * action.payload.price;
      state.quantityPrice = quantityPice; 

      console.log("item quantity: " + action.payload.quantity);
      console.log("item price: " + action.payload.price);
      console.log("item price*quantity: " + state.quantityPrice);

      state.quantity += 1;
      state.total += (action.payload.price * action.payload.quantity);
      state.orders.push(action.payload);
    },
    deleteProduct: (state, action) => {
      console.log("deleted ID: " + action.payload._id + ", Quantity: " + action.payload.quantity + ", Price: " + action.payload.price);
      const filteredArr = state.orders.filter((item) => item._id != action.payload._id);
      state.orders = filteredArr;
      state.quantity -= 1;
      state.total -= (action.payload.quantity * action.payload.price);
    },
    changeProductQuantity:(state,action)=>{
      const amount=action.payload.amount;
      const selectedValues=action.payload.selectedValues;
      const _id=action.payload._id;
      state.orders.forEach((order)=>{
        if(_id===order._id&&_.isEqual(selectedValues,order.selectedValues)){
          order.quantity+=amount;
          state.total+=amount*order.price
        }
      }
      )
    },
    clearArray:  (state) => {
      state.orders = [];
      state.quantity = 0;
      state.total = 0
    }
  },
});

export const { addProduct, deleteProduct, clearArray,changeProductQuantity} = CartReducer.actions;
export default CartReducer.reducer;
