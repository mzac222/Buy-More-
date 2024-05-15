
import asyncHandler from "../middleware/asynchandler.js";
import Order from "../models/OrderModel.js";

//@desc  create new order
//@route post api/orders 
// @access private 
const addOrderItems= asyncHandler(async (req,res)=>{
    // const product=await Product.find({});
    const { orderItems, shippingAddress, paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
      }
    else{
        const order = new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          });
          const createdOrder = await order.save();

          res.status(201).json(createdOrder);
      
    }

});


//@desc  get users items that are logged in 
//@route post api/orders/myorders 
// @access private 
// bascially we want to get the id of the user that is logged in 
const getMyOrders= asyncHandler(async (req,res)=>{
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});




//@desc  get order by id 
//@route post api/orders/myorders/:id
// @access private 
const     getOrderById = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
      );
    
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }});




// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // NOTE: here we need to verify the payment was made to PayPal before marking
    // the order as paid
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error('Payment not verified');
  
    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error('Transaction has been used before');
  
    const order = await Order.findById(req.params.id);
  
    if (order) {
      // check the correct amount was paid

  
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
  
      const updatedOrder = await order.save();
  
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });
  


//@desc  update order to be deliverd  admin 
//@route PUT api/orders/myorders/:id/deliver
// @access private/admin 
const     updateOrderToDelivered= asyncHandler(async (req,res)=>{
    // const product=await Product.find({});

    res.json("order has been deliverd");
});



//@desc  get all orders 
//@route get api/orders
// @access private/admin 
const getOrders= asyncHandler(async (req,res)=>{
    // const product=await Product.find({});

    res.json("get all orders ");
});



export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};