import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "./AuthSlice";



const initialState = {
  cartsData: "",
};

export const addProductToCart = createAsyncThunk(
  "/cart/addProductToCart",
  async (productId) => {
    try {
      const products = axiosInstance.post(`/carts/add/${productId}`);
      toast.promise(products, {
        success: "Product Added To cart Successfully",
        loading: "Adding Product to cart",
        error: "Something went wrong, please try again",
      });

      const apiResponse = await products;
      return apiResponse?.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "/cart/removeProductFromCart",
  async (productId) => {
    try {
      const products = axiosInstance.post(`/carts/remove/${productId}`);
      toast.promise(products, {
        success: "Product Removed Successfully",
        loading: "Removing Product from cart",
        error: "Something went wrong, please try again",
      });

      const apiResponse = await products;
      return apiResponse?.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
);

export const getAllProductFromCarts = createAsyncThunk("/cart/getAllProductFromCart", async (_, { dispatch }) => { // Access dispatch from thunk

    try {
      const products = axiosInstance.get(`/carts`);

      toast.promise(products, {
        success: "Product Fetched Successfully",
        loading: "Fetching Product from cart",
        error: "Something went wrong, please try again later",
      });

      const apiResponse = await products;
      return apiResponse?.data;

    } catch (error) {
      console.log("Error:", error);

      // Handle specific error
      if (error?.response?.data?.message === "Invalid token provided") {
        await dispatch(logout());
        toast.error("session expired, Please login again");
      }

      toast.error("Something went wrong");
      throw error; // Important: Re-throw error to handle it properly in component
    }
  }
);


export const deleteAllProductFromCarts = createAsyncThunk(
  "/cart/deleteAllProductFromCarts",
  async () => {
    try {
      const products = axiosInstance.get(`/carts/clear`);
      toast.promise(products, {
        success: "Cart Cleared Successfully",
        loading: "Deleting All data cart",
        error: "Something went wrong, please try again",
      });

      const apiResponse = await products;
      return apiResponse?.data;
    } catch (error) {
      console.log(error);
    
      toast.error("Something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllProductFromCarts.fulfilled, (state, action) => {

      state.cartsData = action?.payload?.data?.items;
    });
  },
});

export default cartSlice.reducer;
