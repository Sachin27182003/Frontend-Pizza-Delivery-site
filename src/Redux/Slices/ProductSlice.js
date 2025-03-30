import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    productsData: []
}

export const getAllProducts = createAsyncThunk('/product/getAllProducts', async (data) => {
    try {
        const products = axiosInstance.post('/products', data);
        toast.promise(products, {
            success: "Products Fetched Successfully",
            loading: "Fetching Products",
            error: "Something went wrong"
        })

        const apiResponse = await products;
        return apiResponse?.data;

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
})

export const getProductDetails = createAsyncThunk('/product/getproductDetails', async (id) => {
    try {
        const product = axiosInstance.get(`/product/${id}`);
        toast.promise(product, {
            success: "Product Fetched Successfully",
            loading: "Fetching Product",
            error: "Something went wrong"
        })

        const apiResponse = await product;
        return apiResponse?.data;

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
})

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.productsData = action?.payload?.data;
        })
    }
})

export default ProductSlice.reducer;