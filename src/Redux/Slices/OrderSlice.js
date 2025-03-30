import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    ordersData: null
}

export const placeOrder = createAsyncThunk("/order/placeOrder", async (productId) => {
      try {
        const products = axiosInstance.post('/orders');
        toast.promise(products, {
          success: "Order Placed Successfully",
          loading: "Placing your Order",
          error: "Something went wrong, please try again",
        });
  
        const apiResponse = await products;
        return apiResponse;
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  );

const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.ordersData = action?.payload?.data
        })
    }
})

export default OrderSlice.reducer;