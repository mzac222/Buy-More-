
import asyncHandler from "../middleware/asynchandler.js";

import User from "../models/UserModel.js"
import generateToken from "../utils/generateToken.js";

//@desc  auth user and get token 
//@route get api/users/login 
// @access public 
const authUser= asyncHandler(async (req,res)=>{
   const {email,password}=(req.body);  //destructure
   const user=await User.findOne({email});
   if(user && await user.matchPassword(password)){
      generateToken(res,user._id);
 

    
    res.status(200).json(
        {
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        }
    )
   }
   else{
    res.status(404);
    throw new Error("invalid email or password");
   }
 
});;



//@desc  Register User
//@route post/api/users 
// @access public 
const    registerUser= asyncHandler(async (req,res)=>{
   const {name,email,password} =req.body;
   const userExists=await User.findOne({email})
   if (userExists){
      res.status(400);
      throw new Error("invalid User already exists");

   }
   const user=await User.create({
      name,
      email,
      password
   });
   if(user){
      generateToken(res,user._id);
      res.status(200).json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin
      })

   }
   else{
      res.status(400);
      throw new Error("Invalid user Data");
   }

});



//@desc  Logout User
//@route post/api/users/logout
// @access private
const logoutUser = (req, res) => {
  res.clearCookie('jwt',"",{httpOnly:true, expiresIn:new Date(0)});
  res.status(200).json({ message: 'Logged out successfully' });
};


const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
 
   if (user) {
     res.json({
       _id: user._id,
       name: user.name,
       email: user.email,
       isAdmin: user.isAdmin,
     });
   } else {
     res.status(404);
     throw new Error('User not found');
   }
 });
 
 // @desc    Update user profile
 // @route   PUT /api/users/profile
 // @access  Private
 const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
 
   if (user) {
     user.name = req.body.name || user.name;
     user.email = req.body.email || user.email;
 
     if (req.body.password) {
       user.password = req.body.password;
     }
 
     const updatedUser = await user.save();
 
     res.json({
       _id: updatedUser._id,
       name: updatedUser.name,
       email: updatedUser.email,
       isAdmin: updatedUser.isAdmin,
     });
   } else {
     res.status(404);
     throw new Error('User not found');
   }
 }); 
//@desc get Users
//@route get /api/users
// @access private


const  getUsers= asyncHandler(async (req,res)=>{
   res.send("get Users");
});


//@desc get Users by 
//@route get /api/users/:id
// @access private


const  getUserById= asyncHandler(async (req,res)=>{
   res.send("get Users by ID");
});




//@desc  delete user
//@route delete /api/users/:id
// @access private admin 


const    deleteUser= asyncHandler(async (req,res)=>{
   res.send("delete Users");
});




//@desc  update User
//@route PUT /api/users/:id
// @access private admin 


const   updateUser= asyncHandler(async (req,res)=>{
   res.send("update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};