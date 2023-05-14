import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    openDrawer: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggleDrawer, closeDrawer, openDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
