import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModal.js";

// Protect Routes

const protect = asyncHandler( async(req, res, next) => {
    let token;

    // Read token from cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized, toekn failed');    
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, No action');
    }
});


// Admin Middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export {protect, admin};
