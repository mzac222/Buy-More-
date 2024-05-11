import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import  Order from "./models/OrderModel.js";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";
import connectDB from "./config/db.js";


dotenv.config();
connectDB();

const importData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();  
    const createdUsers= await User.insertMany(users);  // creating new users i.e 3 
    const adminUser= await createdUsers[0]._id;  // getting id of admin 

    //variable that holds products that we insert 
    const sampleProducts=products.map((product)=>{
        return {...product,user:adminUser}; //product data and value of user 
});

await Product.insertMany(sampleProducts); //insert all the products into the data base 

console.log("data imported".green.inverse);
process.exit();



    }
    catch(error){

        console.error(`${error}`.red.inverse);
        process.exit(1);

    }
}





const destroyData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();  
console.log("data destroyed".red.inverse);
process.exit();



    }
    catch(error){

        console.log({error}.red.inverse);
        process.exit(1);
    }
}


if(process.argv[2]==='-d'){
    destroyData();
}
else{
    importData();
}