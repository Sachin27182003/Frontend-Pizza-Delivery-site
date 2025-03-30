import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

let parsedData;
try {
    parsedData = JSON.parse(localStorage.getItem('data')) || {};
} catch (error) {
    parsedData = {}; // Ensure data is always an object
}

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || '',
    data: parsedData, 
};



export const createAccount = createAsyncThunk('/auth/createAccount', async (data) => {

    try {
        const response = axiosInstance.post('/users/', data);
        toast.promise(response, {
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message;
            },
            loading: 'Hold back tight we are creating your account',
            error: (rejectedPromise) => {
                return rejectedPromise?.response?.data?.error?.message;
            }
        },  {
            style: { color: 'green' },
            duration: 1500
            }
        );

        const apiResponse = await response;
        return apiResponse?.data;
        
    } catch (error) {
        console.log(error);

        return error.response?.data;
    }
});

export const login = createAsyncThunk('/auth/login', async (data) => {

    try {
        const response = axiosInstance.post('/auth/login', data, { withCredentials: true });
        toast.promise(response, {
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message;
            },
            loading: 'Hold back tight we are creating your account',
            error: (rejectedPromise) => {
                return rejectedPromise?.response?.data?.error;
            }
        },  {
            style: { color: 'green' },
            duration: 1500
            }
        );

        const apiResponse = await response;
        return apiResponse?.data;
        
    } catch (error) {

        return error.response?.data;
    }
});

export const logout = createAsyncThunk('/auth/logout', async (data) => {

    try {
        const response = axiosInstance.post('/auth/logout', data);
        toast.promise(response, {
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message;
            },
            loading: 'Logging out...',
            error: "Something went wrong"
        }
        );

        const apiResponse = await response;
        return apiResponse?.data;
        
    } catch (error) {

        console.log(error);
    }
});

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            // reducer which will execute when the login thunk is fulfilled 

            state.isLoggedIn = true;
            state.role = action?.payload?.data?.userRole;
            state.data = action?.payload?.data?.userData;

            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.data?.userRole);
            localStorage.setItem('data', JSON.stringify(action?.payload?.data?.userData));
        })
        .addCase(logout.fulfilled, (state) => {
            // reducer which will execute when the logout thunk is fulfilled 

            localStorage.setItem('isLoggedIn', false);
            localStorage.setItem('role', '');
            localStorage.setItem('data', JSON.stringify({}));

            state.isLoggedIn = false;
            state.role = '';
            state.data = {};
        })
    }
});

export default AuthSlice.reducer;