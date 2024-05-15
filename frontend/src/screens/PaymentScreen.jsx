import React from 'react'
import { useState , useEffect} from 'react'
import { Form ,Button , Col } from 'react-bootstrap'
import { UseDispatch,useDispatch,useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckOutSteps'
import { savePaymentMethod } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
const PaymentScreen = () => {
    const [paymentMethod,setPaymentMethod]=useState("PayPal");
    const dispatch=useDispatch();
    const naviagate=useNavigate();
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;
    useEffect(()=>{
        if(!shippingAddress.address){
            naviagate('/shipping');
        }
    },[shippingAddress,naviagate]);
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        naviagate('/placeorder')
    }
      return (
  <>    
  <FormContainer >
  <CheckoutSteps step1 step2 step3/>  
  <h1>Payment Method</h1>
  <Form onSubmit={submitHandler}>
    <Form.Group>
    <Form.Label as="legend">
    Select Method
    </Form.Label>
    <Col>
        <Form.Check type='radio' className='my-2' label="PayPal or Credit Card " id="PayPal" name="paymentMethod" value="PayPal" checked 
                onChange={(e) => setPaymentMethod(e.target.value)}
         >
            
        </Form.Check>
    </Col>

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

export default PaymentScreen