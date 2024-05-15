import { PRODUCTS_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apislices"; 


export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({login: builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/auth`,
            method:'POST',
            body:data,
            headers: { "Content-Type": "application/json" },
credentials: "include"
             
        }),
        keepUnusedDataFor:5
    }),
    register: builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}`,
            method:'POST',
            body:data,
            headers: { "Content-Type": "application/json" },
credentials: "include"
             
        }),
        keepUnusedDataFor:5
    }),
  
    logout: builder.mutation({
        query:()=>({
            url:`${USERS_URL}/logout`,
            method:'POST'

             
        }),
        keepUnusedDataFor:5
    }),
    profile: builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/profile`,
            method:'PUT',
            body:data,
             
        }),
        keepUnusedDataFor:5
    }),
 

}), 
});


export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation}=usersApiSlice;
