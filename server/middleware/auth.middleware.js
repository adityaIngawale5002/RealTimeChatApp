import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.middleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticated=TryCatch((req,res,next)=>{

    const token=req.cookies['cookie-token'];
    if(!token){
        return next(new ErrorHandler("pls login to access this route",401),req,res);
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);;
    req.user=decodedData._id
    next();
})


export const adminOnly=TryCatch((req,res,next)=>{
    const token=req.cookies['admin-token'];

    if(!token){
        return next(new ErrorHandler("only admin acn this route",401));
    }
    const adminId=jwt.verify(token,process.env.AdminSecretKey);;

    const isMatch=secretKey===adminId;
    if(!isMatch) return next(new ErrorHandler("admin key does not match",401));
    
    next();
})


export const socketAuthenticator=async(err,socket,next)=>{

    try {
        if(err){
            return next(err)
        }
        const authToken=socket.request.cookies["cookie-token"];
        const decoded=jwt.verify(authToken,process.env.JWT_SECRET);
        const user=await User.findById(decoded._id)
        if(!user) return next(new ErrorHandler("unauthorised user",404))

        socket.user=user;
        
        return next()
    } catch (error) {
       
        return next(new ErrorHandler("plese login to access route",401));
    }

}