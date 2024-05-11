import {Row,Col} from "react-bootstrap"
import React from 'react'
import { useGetProductsQuery } from "../slices/productsApiSlice"
import Loader from "../Components/Loader"
import Message from "../Components/Message"

import Product from "../Components/Product"


export const HomeScreen = () => {
  const  {data:products,isLoading,error}=useGetProductsQuery();
  return (
    <>
    {isLoading ? (<Loader/>) :error ? (<Message variant="danger">error?.data?.meessage || error.error</Message>) : (<><h1>latest products</h1>
        <Row>
            {products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row></>)}
        
    </>
  )
}
