import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "Categories",
  initialState: {
    allCategories: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.allCategories = action.payload;
    },
  },
});

export const { setCategories } = CategorySlice.actions;
export default CategorySlice.reducer;
