import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    admin: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginAdmin = createAsyncThunk("admin/LoginAdmin", async(admin, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/login', {
            email: admin.email,
            password: admin.password
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("admin/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:4000/auth/getMe');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("admin/LogOut", async() => {
    await axios.delete('http://localhost:4000/auth/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginAdmin.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(LoginAdmin.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.admin = action.payload;
        });
        builder.addCase(LoginAdmin.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get Admin Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.admin = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;