import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    ordersData: null,
    myOrders: null
}

export const placeOrder = createAsyncThunk("/order/placeOrder", async (details) => {
      try {
        const products = axiosInstance.post('/orders', details);
        toast.promise(products, {
          success: "Order Placed Successfully",
          loading: "Placing your Order",
          error: "",
        });
  
        const apiResponse = await products;
        return apiResponse;
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error?.response?.data?.message);
      }
    }
  );

  export const fetchOrders = createAsyncThunk("/myorders/", async () => {
    try {
      const products = axiosInstance.get('/orders');
      toast.promise(products, {
        success: "",
        loading: "Fetching your Active Orders",
        error: "Something went wrong, please try again",
      });
      
      const apiResponse = await products;
      return apiResponse;

    } catch (error) {
      console.log(error);
    }
  });

  export const updateOrders = createAsyncThunk("/updateAddress/", async ({orderId, updatedValue}) => {
    try {
      const products = axiosInstance.patch(`/orders/update/${orderId}`, updatedValue);
      toast.promise(products, {
        success: "",
        loading: "working on your request",
        error: "Something went wrong, please try again",
      });
      
      const apiResponse = await products;
      return apiResponse;

    } catch (error) {
      console.log(error);
    }
  }
);

const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
        .addCase(placeOrder.fulfilled, (state, action) => {
            state.ordersData = action?.payload?.data
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.myOrders = action?.payload?.data?.data;
        })
    }
})

export default OrderSlice.reducer;