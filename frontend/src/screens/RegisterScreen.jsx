import React from 'react';
import { useState,useEffect } from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import FormContainer from '../Components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from "react-toastify";

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpass, setConfirm] = useState('');



  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [register,{isLoading}]=useRegisterMutation();
  const {userInfo}=useSelector((state)=>state.auth);
  //user info is in auth 

  const {search}=useLocation();
  const sp=new URLSearchParams(search);
  const redirect=sp.get("redirect") || '/';
  // check to see if we are logged in  if we are then we want to get redirected to the home page 
  useEffect(()=>{
    // if user info in the local storage then we naviagate to redirect 
    if(userInfo){
        navigate(redirect);
    }

  },[userInfo,redirect,navigate]);
  const submitHandler = async(e) => {
    e.preventDefault();
    if(password != confirmpass){
        toast.error("passwords do not match please try again !");
    }
    
    try{
        const res=await register({name,email,password}).unwrap();
        dispatch(setCredentials({...res,}))
        navigate(redirect);
        toast.success(`Welcome ${name}`);

    }
    catch(error){
toast.error(error?.data?.message || error.error);

    }
  };

  return (
    <FormContainer>
      <h1>Register !</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmpass}
            onChange={(e) => setConfirm(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className='justify-content-center'>
          <Col xs='auto'>
            <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
              Register
            </Button>
          </Col>
        </Row>
       {isLoading && <Loader/>}
      </Form>
      <Row className='py-3'>
      <Col>
    Already have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Register</Link>
      </Col>

      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
