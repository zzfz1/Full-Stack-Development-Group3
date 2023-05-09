import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Products",
  initialState: {
    setProducts: null,
  },
  reducers: {
    allProduct: (state, action) => {
      state.setProducts = action.payload;
    },
  },
});

export const { allProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
