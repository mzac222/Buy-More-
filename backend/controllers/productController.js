
import asyncHandler from "../middleware/asynchandler.js";
import Product from "../models/ProductModel.js";


//@desc  fetch all products 
//@route get api/products
// @access public 
const getProducts= asyncHandler(async (req,res)=>{
    const product=await Product.find({});

    res.json(product)
});



//@desc  fetch a product 
//@route get api/products/:id
//@access public 


const getProductBydId= asyncHandler(async (req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
    res.json(product);
    }
    else{
        res.status(404);
        throw new Error("product not found");
    }

    
});

export {getProductBydId,getProducts};