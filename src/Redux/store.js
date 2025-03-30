import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice"; 
import ProductSliceReducer from "./Slices/ProductSlice";
import cartSliceReducer from "./Slices/CartSlice";
import OrderSliceReducer from "./Slices/OrderSlice";



export const store = configureStore({
    reducer:{
        auth: AuthSliceReducer,
        product: ProductSliceReducer,
        cart: cartSliceReducer,
        order: OrderSliceReducer
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})