import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "Orders",
  initialState: {
    myOrders: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.myOrders = action.payload;
    },
  },
});

export const { setOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
