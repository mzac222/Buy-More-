import jwt from "jsonwebtoken";
import asyncHandler from "./asynchandler.js";
import User from "../models/UserModel.js";

// Protect routes middleware
export const protect = asyncHandler(async(req, res, next) => {
    let token;
    // Read the JWT from the cookie. 'jwt' is just the name we are using here to access it.
    token = req.cookies.jwt;
    if (token) {
        // Decode the token to get userID as it was added as the payload
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user from the database that matches the userID
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as admin");
    }
};
