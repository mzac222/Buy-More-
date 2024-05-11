//holds 3 dummy users 

// hashing passwords use bcrypt

import bcrypt from "bcrypt"

const users=[
    {
        name:"Admin User",
        email:"admin@123gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:"John Doe",
        email:"John@123gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:"Jane Doe",
        email:"Jane@123gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    }
    
    
]

export default users;