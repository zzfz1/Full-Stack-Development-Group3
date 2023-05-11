import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as orderAPI from "./orderAPI";

export const getAllOrdersAsync = createAsyncThunk("orders/getAllUsers", async () => {
  try {
    const users = await orderAPI.getAllOrdersAPI();
    return users;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOrderBySlugAsync = createAsyncThunk(
  "orders/getOrderBySlug", //
  async (slug, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrderBySlugAPI(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderByIdAsync = createAsyncThunk(
  "orders/getOrderById", //
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrderByIdAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "orders/createOrder", //
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await orderAPI.createOrderAPI(newOrder);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  "orders/editOrder", //
  async ({ id, updatedOrder }, { rejectWithValue }) => {
    try {
      const response = await orderAPI.updateOrderAPI(id, updatedOrder);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrderAsync = createAsyncThunk(
  "orders/deleteOrder", //
  async (_id, { rejectWithValue }) => {
    try {
      const response = await orderAPI.deleteOrderAPI(_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: { orders: [], order: null, status: "idle", error: null },
  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex((order) => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      const index = state.orders.findIndex((order) => order._id === action.payload);
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getOrderBySlugAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderBySlugAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload; // Set the geted order
        state.error = null;
      })
      .addCase(getOrderBySlugAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getOrderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload; // Set the geted order
        state.error = null;
      })
      .addCase(getOrderByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.orders.findIndex((order) => order._id === action.payload);
        if (index !== -1) {
          state.orders.splice(index, 1);
        }
        state.error = null;
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createOrder, updateOrder, deleteOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
