import express from "express";

import dotenv from "dotenv";
import { errorHandler, notFound} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import cookieParser from "cookie-parser";



dotenv.config();
connectDB();
const app=express(); 
const port=5000;
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 

app.get("/",(req,res)=>{

    res.send("hello world !!");        
});

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);

app.use(notFound);
app.use(errorHandler);
// we can access req.cookies.jwt 
//body parser



app.listen(port,()=>{
    console.log(`hello world we are running at port ${port} .`);
})
