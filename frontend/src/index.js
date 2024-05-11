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

import { Provider } from 'react-redux';
import LoginScreen from './screens/LoginSceen';
import store from './store';
import RegisterScreen from './screens/RegisterScreen';

const router=createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
     <Route  index={true} path='/' element={<HomeScreen/>}/>
     <Route  path='/product/:id' element={<ProductScreen/>}/>
     <Route  path='/cart' element={<CartScreen/>}/>
     <Route  path='/login' element={<LoginScreen/>}/>
     <Route  path='/register' element={<RegisterScreen/>}/>

 


     
     </Route>

  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
<RouterProvider router={router}/>
</Provider>
  
  </React.StrictMode>
);
reportWebVitals();
