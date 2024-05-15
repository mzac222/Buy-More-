import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
import {  useSelector } from 'react-redux' 
// to get userInfo piece of state 


const PrivateRoute = () => {
 const  {userInfo}=  useSelector(state=>state.auth);
 
  return userInfo ? <Outlet/> :  <Navigate to="/login" replace/>
}

export default PrivateRoute