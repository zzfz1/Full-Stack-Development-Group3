import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Products",
  initialState: {
    products: null,
  },
  reducers: {
    allProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { allProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
