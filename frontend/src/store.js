import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apislices";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";


const store = configureStore({
reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    cart:cartSliceReducer,
    auth:authSliceReducer
},

middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
devTools:true
}); 

//this is where we add the reducer 


export default store ;