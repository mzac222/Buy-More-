 
import { useParams ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import {Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap' 
import Rating  from '../Components/Rating'
import { Link } from 'react-router-dom'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { addTocart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
const ProductScreen = () => {
    const  {id:productId}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [qty,setQty]=useState(1);

    const  {data:product,isLoading,error}=useGetProductsDetailsQuery(productId);

    const addTocartHandler=()=>{

        dispatch(addTocart({...product,qty}));
        navigate('/cart');

        
    }

  return (
    <>
    <Link
    className='btn btn-light ho my-3' // Add your custom classes here
    to="/"
  >
    Go Back
  </Link>
{isLoading ? (<Loader/>) : error ? (<Message variant="danger">error?.data?.meessage || error.error</Message>) : (  <Row>
    <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>
    </Col>
    <Col md={4} >
        <ListGroup variant="flush">
        <ListGroup.Item>
        <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </ListGroup.Item>
        <ListGroup.Item>
        <strong>${product.price}</strong>
        <hr />
        <strong>{product.description}</strong>

        </ListGroup.Item>
        </ListGroup>
    </Col>
    <Col md={3}>
        <Card>
        <ListGroup>
        <ListGroup.Item>
        <Row>
            <Col>
                Price:
            </Col>
            <Col>
                <strong>${product.price}</strong>
            </Col>
        </Row>
        </ListGroup.Item>
        <ListGroup.Item>
        <Row>
            <Col>
                Status
            </Col>
            <Col>
                <strong>{product.countInStock > 0 ? "In Stock" :'Out of Stock ' }</strong>
            </Col>
        </Row>

        
        </ListGroup.Item>
        {product.countInStock>0 && ( <ListGroup.Item>
        <Row>
            <Col>
                Quantity
            </Col>

            <Col>
               <Form.Control
                as="select"
                value={qty}
                onChange = {(e) => setQty(Number(e.target.value))}> 
                {[...Array(product.countInStock).keys()].map((x)=>
                <option key={x+1} value={x+1}>{x+1}</option>)}   
               </Form.Control>
            </Col>
        </Row>
 
        
        </ListGroup.Item>)}
        

        <ListGroup.Item>
<Button className='btn-block center' disabled={product.countInStock===0}  
onClick={addTocartHandler}
style={{ // Add inline styles for centering
    display: 'block',
    margin: '0 auto',
    textAlign: 'center'
  }}>Add to Cart</Button>
        </ListGroup.Item>
        </ListGroup>
        </Card>
    </Col>

  </Row>) } 

  </>)
}

export default ProductScreen