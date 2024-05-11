import {  createSlice } from "@reduxjs/toolkit";

import { updateCart } from "../utils/cardUtils";
const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):{cartItems: []};


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addTocart:(state,action) =>{
            const item=action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id); //to check if item is already in the cart
             
            if(existItem){
                state.cartItems = state.cartItems.map((x)=>
                x._id===existItem._id ? item : x )                        
                    }
                    else{ 
                        state.cartItems=[...state.cartItems,item]
                    }


              
                return updateCart(state);
                
                
                

                },
             removeFromCart:(state,action) =>{
state.cartItems=state.cartItems.filter((x)=>x._id !== action.payload
);
return updateCart(state);
             }   
            }
             
        }
    
)
export const {addTocart,removeFromCart}=cartSlice.actions;

export default cartSlice.reducer;