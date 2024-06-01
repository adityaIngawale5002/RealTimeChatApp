
import { User } from "../models/user.models.js"
import { emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { compare } from "bcrypt";
import { TryCatch } from "../middleware/error.middleware.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.models.js";
import {Request} from '../models/request.models.js'
import { NEW_REQUEST, REFETCH_CHAT } from "../constants/events.js";
import { Getothermember } from "../lib/helper.js";

//Signup handler
export const signup=TryCatch(async (req,res,next)=>{

     const {name,username,password,bio}=req.body;
    
     const file=req.file
  
     if(!file) return next(new ErrorHandler("pls upload avatar",403));
     //uploading to cloudinary
     const result=await uploadFilesToCloudinary([file]);
    
     const avatar={
          public_id:result[0].public_id,
          url:result[0].url
     }
    const user= await User.create({
          name,
         username,
         password,
          bio,
          avatar

     })

    return sendToken(res,user,201,"user created successfully")
     
})


//login handler
export const login=TryCatch(async (req,res,next)=>{

     const {username,password}=req.body;

     const user=await User.findOne({username}).select("+password");
     if(!user){
          return next(new ErrorHandler("invalid username or password",402))
     }

     const isMatch=await compare(password,user.password);

     if(!isMatch){
       return next(new ErrorHandler("Invalid username or password",402))
     }

     
     return sendToken(res,user,200,`welcome back ${user.name}`);

 }
)


//get the user profile handler
export const getUserProfile=TryCatch(async(req,res,next)=>{
     const user=await User.findById(req.user);
     res.status(200).json({
          success:true,
          user,
     })

})



// logout user handler
const cookieOptions={
     maxAge:0,
     sameSite:"none",
     httpOnly:true,
     secure:true,
 
 }
export const logout=TryCatch(async (req,res)=>{
     return res.status(200).cookie("cookie-token","",cookieOptions).json({
          success:true,
          message:"loggout successfully"
     })
})




//get all the user searched
export const searchUser=TryCatch(async (req,res,next)=>{
     const {name}=req.query;
     const mychat=await Chat.find({groupChat:false,members:req.user});
     const allUserFromMychat=mychat.flatMap((member)=>Chat.members);

     const allUserOtherthanFriends=await User.find({_id:{$nin:allUserFromMychat},name:{$regex:name,$options:"i"},});

     const users=allUserOtherthanFriends.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}))
     return res.status(200).json({
          success:true,
          users,
     })
})



//sending friend request handler
export const sendRequest=TryCatch(async(req,res,next)=>{
     const {userId}=req.body;
     const request=await Request.findOne({$or:[
          {sender:req.user,receiver:userId},
          {sender:userId,receiver:req.user},
     ]});
    
     if(request) return next(new ErrorHandler("request already exist",404));

     await Request.create({sender:req.user,receiver:userId})

    emitEvent(req,NEW_REQUEST,[userId],"request");

     return res.status(200).json({
          success:true,
          message:'Request sent'
     })
})



//handler to accept friend request
export const acceptRequest=TryCatch(async(req,res,next)=>{

     const {requestId,accept}=req.body

     const request=await Request.findById(requestId).populate("sender","name").populate("receiver","name");
     
     if(!request) return next(new ErrorHandler("Request not found",404));

     if(request.receiver._id.toString()!==req.user.toString()) return next(new ErrorHandler("unauthorized ",401));

     if(!accept){
          await request.deleteOne();
          return res.status(200).json({
               success:true,
               message:"Friend rejected"
          })
     }

     const members=[request.sender._id,request.receiver._id];
     
     await Promise.all([
          Chat.create({
               members,
               name:`${request.sender.name}-${request.receiver.name}`
          }),
          request.deleteOne(),


     ])

    // emitEvent(req,REFETCH_CHAT,members);

     return res.status(200).json({
          success:true,
          message:"request accepted successfuly",
          senderId:request.sender._id
     })

})




export const getMyfriends=TryCatch(async(req,res,next)=>{
 
     const chatId=req.query.chatId;
     const chats=await Chat.find({members:req.user,groupChat:false}).populate("members","name avatar")

     const friends=chats.map((chat)=>{
    
          const otherMember=Getothermember(chat.members,req.user);
          
          return {
               _id:otherMember[0]._id,
               name:otherMember[0].name,
               avatar:otherMember[0].avatar.url
          }
          
          
     })
  
     if(chatId){
          const chat=await Chat.findById(chatId);
          const availableFriends=friends.filter((friend)=>!chat.members.includes(friend._id));
       
          return res.status(200).json({
               success:true,
               friends:availableFriends
          })
     }
     else{
          return res.status(200).json({
               success:true,
               friends,
          })
     }
})

export const getNotification=TryCatch(async(req,res)=>{

     const request=await Request.find({receiver:req.user}).populate("sender","name avatar");
 
     const allRequest=request.map(({_id,sender})=>({
         _id,
         sender:{
             _id:sender._id,
             name:sender.name,
             avatar:sender.avatar.url
         }
     }))
 
     return res.status(200).json({
         success:true,
         allRequest
     })
 })