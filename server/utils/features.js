import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import {v2 as cloudiary}  from "cloudinary"
// import { ErrorHandler } from "./utility";
import { getBase64, getSockets } from "../lib/helper.js";
import { ErrorHandler } from "./utility.js";

export const connectDB=()=>{

    mongoose.connect(process.env.DATABASE_URL)
    .then((data)=>{
        console.log("connected to db");

    })
    .catch((error)=>{
        console.log(error,"error in database");
        
    })
    
}


const cookieOptions={
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true,
}
export const sendToken=async (res,user,code,message)=>{

        const token=jwt.sign({_id:user._id,},process.env.JWT_SECRET)

        return res.status(code)
        .cookie("cookie-token",token,cookieOptions)
        .json(
            {
                success:true,
                message,
                user,
            }
        )
}



export const uploadFilesToCloudinary=async (files=[])=>{
    const uploadPromise=files.map((file)=>{
       return new Promise((resolve,reject)=>{
        cloudiary.uploader.upload(
            file.path,
            {resource_type:"auto",public_id:uuid()},
            (error,result)=>{
                if(error) return reject(error);
                resolve(result);
            }
            )
       })
    })

    try {
        const results=await Promise.all(uploadPromise);
        const formatedResult=results.map((result)=>({
            public_id:result.public_id,
            url:result.secure_url,
        }))
        return formatedResult;
    } catch (error) {
        //console.log(error)
        throw new ErrorHandler("error uploading in cloudinary")
    }
}






export const  emitEvent=(req,event,user,data)=>{
    const io=req.app.get("io");
    const userSocket=getSockets(user);
    io.to(userSocket).emit(event,data);
}

export const deleteFilesFromCloudinary=async(public_ids)=>{

}