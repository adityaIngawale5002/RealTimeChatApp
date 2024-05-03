import { TryCatch } from "../middleware/error.middleware.js";
import { Chat } from "../models/chat.models.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken"

const cookieOptions={
    maxAge:1000*60*15,
    sameSite:"none",
    httpOnly:true,
    secure:true,

}
export const adminLogin=TryCatch(async(req,res,next)=>{
    const {secretKey}=req.body;
    const adminSecretKey='aditya'  //set it in env
    const isMatch=secretKey === adminSecretKey;
    if(!isMatch) return next(new ErrorHandler("Invalid admin Key",401));

    const token =jwt.sign(secretKey,adminSecretKey);
     return res.status(200).cookie("admin-token",token,cookieOptions).json({
        success:true,
        message:"authenticated sucessfully"
     })

})

const cookieLogoutOptions={
    maxAge:0,
    sameSite:"none",
    httpOnly:true,
    secure:true,

}

export const adminLogout=TryCatch(async(req,res)=>{
     return res.status(200).cookie("admin-token",'',cookieLogoutOptions).json({
        success:true,
        message:"logout successfully"
     })
})

export const allUSer=TryCatch(async(req,res)=>{
    
    const users=await User.find({})

    const transformdata=await Promise.all([
        
        users.map((name,username,avatar,_id)=>{

       const [groups,friends]= Promise.all([
            Chat.countDocuments({groupChat:true,members:_id}),
            Chat.countDocuments({groupChat:false,members:_id}),
        ])



        return{
            name,
            username,
            avatar:avatar.url,
            _id,
            groups,
            friends

        }
    })])

    return res.Status(200).json({
        success:true,
        users:transformdata,
    })
})

export const allChats=TryCatch(async(req,res)=>{
    const chats=await Chat.find({}).populate("members","name avatar").populate("creator","name avatar");

    const transformChat=await Promise.all([
        chats.map(async({members,_id,groupChat,name,creator})=>{
            const totalMessages=await Message.countDocuments({chatId:_id})
                return{
                    _id,name,groupChat,
                    avatar:members.slice(0,3).map((member)=>member.avatar.url),
                    members:members.map((member)=>{
                        return {
                            _id:member._id,
                            name:member.name,
                            avatar:member.avatar.url
                        }
                    }),
                    creator:{
                            name:creator?.name || "none",
                            avatar:creator?.avatar || "",
                            },
                    totalMembers:members.length,
                    totalMessages

                }
        })
    ])
})

export const allMessages=TryCatch(async(req,res)=>{
    const messages=await Message.find({}).populate("sender","name avatar").populate("chat","groupChat")

     const transformMessage=messages.map(({content,attachments,_id,sender,createdAt,chat})=>({
        _id,
        attachments,
        content,
        createdAt,
        chat:chat._id,
        groupChat:chat.groupChat,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url
        }
     }))

    return res.status(200).json({
        success:true,
        transformMessage,
    })
})



export const getDashboardStats=TryCatch(async(req,res)=>{
    const [groupsCount,usersCount,messageCount,totalChatCount]=await promise.all([
                Chat.countDocuments({groupChat:true}),
                User.countDocuments(),
                Message.countDocuments(),
                Chat.countDocuments(),
    ])

    const today=new Date();
    const last7Days=new Date();
    last7Days.setDate(last7Days.getDate()-7);

    const last7DaysMesages=await Message.find({createdAt:{$get:last7Days,$lte:today}}).select("createdAt");
    const day=1000*60*60*24
    last7DaysMesages.forEach(message=>{
        const indexApprox=(today.getTime()-message.createdAt.getTime())/day;
        const index=Math.floor(indexApprox);

        messages[6-index]++;
    })

    const stats={
        groupsCount,usersCount,messageCount,totalChatCount
    }
    return res.status(200).json({
        success:true,
        stats,
    })
})

export const getAdminData=TryCatch(async(req,res,next)=>{
    return req.status(200).json({
        admin:true
    })
})

