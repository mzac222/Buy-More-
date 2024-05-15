import React from 'react'
import { useState ,useEffect } from 'react'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { saveShippingAdress } from '../slices/cartSlice';
import CheckOutSteps from '../Components/CheckOutSteps';
const ShippingScreen = () => {
    const cart =useSelector((state)=>state.cart);
  const {shippingAddress}=cart;
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  const submitHandler = async(e) => {
    e.preventDefault();
    dispatch(saveShippingAdress({
        address,city,country
    }));
    navigate("/payment");

  
   
}
useEffect(() => {
  if (!cart.shippingAddress.address) {
    navigate('/shipping');
  } 
}, [ cart.shippingAddress.address, navigate]);
  return (
    <>
     <CheckOutSteps step1 step2/>  
      <h1>Shipping</h1>
    <FormContainer >
    <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
        <Form.Label>Address</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>

        </Form.Group>
        <Form.Group className='my-2' controlId='address'>
        <Form.Label> City</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>

        </Form.Group>
        <Form.Group className='my-2' controlId='address'>
        <Form.Label>Country</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>

        </Form.Group>
        <Button className='btn-block center'   type='submit' variant='primary'
style={{ // Add inline styles for centering
    display: 'block',
    margin: '30px auto',
    textAlign: 'center',

  }}>Continue</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default ShippingScreen