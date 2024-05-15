import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "C:/Users/Administrator/Desktop/Ecoms/frontend/src/assets/styles/index.css"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from "react-router-dom"

import "./assets/styles/bootstrap.custom.css"
import { HomeScreen } from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import PrivateRoute from './Components/PrivateRoute';
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import { Provider } from 'react-redux';
import LoginScreen from './screens/LoginSceen';
import store from './store';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
const router=createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
     <Route  index={true} path='/' element={<HomeScreen/>}/>
     <Route  path='/product/:id' element={<ProductScreen/>}/>
     <Route  path='/cart' element={<CartScreen/>}/>
     <Route  path='/login' element={<LoginScreen/>}/>
     <Route  path='/register' element={<RegisterScreen/>}/>
     <Route  path='/placeorder' element={<PlaceOrderScreen/>}/>
     <Route  path='/order/:id' element={<OrderScreen/>}/>
     
     <Route  path='/profile' element={<ProfileScreen />}/>

  


 

     <Route  path='' element={<PrivateRoute/>}>
      <Route  path='/shipping' element={<ShippingScreen/>}/>
      <Route  path='/payment' element={<PaymentScreen/>}/>
      <Route  path='/placeorder' element={<PlaceOrderScreen/>}/>


      </Route> 
     
     </Route>

      

  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <PayPalScriptProvider deferLoading={false}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>

</Provider>
  
  </React.StrictMode>
);
reportWebVitals();
