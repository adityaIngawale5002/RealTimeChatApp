import express from 'express'
import { TryCatch } from '../middleware/error.middleware.js'
import { ErrorHandler } from '../utils/utility.js';
import { Chat } from '../models/chat.models.js';
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from '../utils/features.js';
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHAT } from '../constants/events.js';
// import { Getothermember } from '../lib/helper.js';
import { User } from '../models/user.models.js';
import { Message } from '../models/message.models.js';
import { Getothermember } from '../lib/helper.js';
import mongoose, { Types } from "mongoose";



export const newGroupChat=TryCatch(async(req,res,next)=>{

    const {name,members}=req.body;
    // console.log("here in newGroupChat")
    // console.log(name,members)
    if(members.length<2){
        return next(new ErrorHandler("Groupchat must have atleast 2 members",400))
    }

    const allmembers=[...members,req.user];
    await Chat.create({
        name,groupChat:true,creator:req.user,members:allmembers
    })

    emitEvent(req,ALERT,allmembers,`welcome to ${name} group`);
    // emitEvent(req,REFETCH_CHAT,members);

    return res.status(201).json({
        success:true,
        message:"group created successfuly"
    })

})



//get all the chats of the user
export const getMyChat=TryCatch(async (req,res)=>{

    const chats=await Chat.find({members:req.user}).populate("members","name avatar")
  
    const transformedChat=chats.map(({_id,name,members,groupChat})=>{
        const otherMember=Getothermember(members,req.user)
        return {
            _id,
            groupChat,
            avatar:groupChat?members.slice(0,3).map(({avatar})=>avatar.url):[otherMember[0]?.avatar?.url],
            name:groupChat? name:otherMember[0]?.name,
            members:members.reduce((prev,curr)=>{
                if(curr._id.toString()!==req.user.toString()){
                    prev.push(curr._id)
                }
                return prev;
            },[])
        }
    })
    
    return res.status(200).json({
        success:true,
        chats:transformedChat,
    })
})


export const getMyGroups=TryCatch(async(req,res)=>{
    // console.log("here in  get my group")
    const chats=await Chat.find({members:req.user,groupChat:true,creator:req.user}).populate("members","name avatar")
    //  console.log(chats)
    const groups=chats.map(({members,_id,groupChat,name})=>({
        _id,
        groupChat,
        name,
        avatar:members.slice(0,3).map(({avatar})=>avatar.url),
    }))

    return res.status(200).json({
        success:true,
        groups,
    })
})


export const addGroupMember=TryCatch(async(req,res)=>{
    const {chatId,members}=req.body;

    if(!members || members.length<1){
        return next(new ErrorHandler("Please provide members",400))
    }

    const chat=await Chat.findById(chatId);

    if(!chat){
        return next(new ErrorHandler("chat not found",404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("this not a group chat",400))
    }
    if(chat.creator.toString()!== req.user.toString() ){
        return next(new ErrorHandler("you are not aloowed to add members",403))
    }

    const allNewMembersPromise=members.map((i)=>User.findById(i,"name") );

    const newMembers=await Promise.all(allNewMembersPromise)

    const uniqueMembers=newMembers.filter((i)=>!chat.members.includes(i._id.toString())).map((i)=>i._id)

    chat.members.push(...uniqueMembers)
    if(chat.members.length>100){
        return next(new ErrorHandler("group members limit reached",400))
    }
    await chat.save();

    const allUsersName=newMembers.map((i)=>i.name).join(",");

    emitEvent(req,ALERT,chat.members,`${allUsersName} has been added in th group`);

    emitEvent(req,REFETCH_CHAT,chat.members);

    return res.status(200).json({
        success:true,
        message:"Members added successfully"
    })

})

export const removeMember=TryCatch(async(req,res,next)=>{
console.log("herhe in remove member")
    const {userId,chatId}=req.body;
    const [chat,userThatWillBeRemoved]=await Promise.all([
        Chat.findById(chatId),
        User.findById(userId),
    ]);

    if(!chat) return next(new ErrorHandler("chat not found",404));

    if(!chat.groupChat) return next(new ErrorHandler("this not a group chat",400));

    if(chat.creator.toString()!==req.user.toString()) return next(new ErrorHandler("you are not allowed to remove member",403))

    if(chat.members.length<=3){
        return next(new ErrorHandler("group must have  at least 2 members",400));
    }

    chat.members=chat.members.filter((member)=>member.toString()!==userId.toString());
    await chat.save();

    emitEvent(req,ALERT,chat.members,`${userThatWillBeRemoved.name} has been removed fom the group `);

    emitEvent(req,REFETCH_CHAT,chat.members);

    return res.status(200).json({
        success:true,
        message:"Member removed from the group"
    })

})

export const leaveGroup=TryCatch(async(req,res)=>{
    const chatId=req.params.id;

    const chat=await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler("this is not s group chat",400));
    if(chat.members.length<=3){
        return next(new ErrorHandler("group must have  at least 2 members",400));
    }
    const remainingMembers=chat.members.filter((member)=>member.toString()!==req.user.toString());

    if(chat.creator.toString()===req.user.toString()){
       const newCreator=remainingMembers[0];
       chat.creator=newCreator;
    }
    const user=await User.findById(req.user);
    chat.members=remainingMembers;
    await chat.save();

    emitEvent(req,ALERT,chat.members,`User ${user.name} has left the group`)
    emitEvent(req,REFETCH_CHAT,chat.members)

    return res.status(200).json({
        success:true,
        message:"removed from the group"
    })
})

export const sendAttachment=TryCatch(async(req,res)=>{
    const {chatId}=req.body;

    const chat=await Chat.findById(chatId);
    const user=await User.findById(req.user);

    const files=req.files || [];
    if(files.length<1) return next(new ErrorHandler("please send attachment"));
    if(files.length>5) return next(new ErrorHandler("files cannot be more than 5"));

    if(!chat){
        return next(new ErrorHandler("Chat not found",404))
    }
    //upload file here
    const attachments=await uploadFilesToCloudinary(files);

    const messageFroRealTime={
        content:"",
        attachments,
        sender:{
            _id:user._id,
            name:user.name,
        },
        chat:chatId

    };

    const messageForDB=await Message.create({content:"",attachments,sender:user._id,chat:chatId})

    emitEvent(req,NEW_MESSAGE,chat.members,{message:messageFroRealTime,chatId})
    emitEvent(req,NEW_MESSAGE_ALERT,chat.members,{chatId});

    return res.status(200).json({
        success:true,
        message:messageFroRealTime
    })

})

export const getChatDetils=TryCatch(async(req,res,next)=>{
    // console.log("here in get chat details",req.params.id)
    if(req.query.populate==="true"){
    
        const chat=await Chat.findById((req.params.id).toString()).populate("members","name avatar").lean();
        // console.log("chat",chat)
        if(!chat) return next(new ErrorHandler("chat not found",404));
        const members=chat.members.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}))
        return res.status(200).json({

            success:true,
            members,
            name:chat.name
        })
    }
    else{
        const chat=await Chat.findById(req.params.id);
        if(!chat) return next(new ErrorHandler("chat not found",404));

        return res.status(200).json({
            success:true,
            chat,
        })
    }
})


export const renameGroup=TryCatch(async(req,res)=>{
    const chatId=req.params.id;
    const {name}=req.body;
    const chat=await Chat.findById(chatId);
    
    if(!chat) return next(new ErrorHandler("Chat not found",404));

    if(!chat.groupChat) return (new ErrorHandler("this is not group chat",400));

    if(chat.creator.toString()!==req.user.toString()){
        return next(new ErrorHandler("you are not allowed to change the group name",403))
    }

    chat.name=name;
    chat.save()
    emitEvent(req,REFETCH_CHAT,chat.members);

    return res.status(200).json({
        success:true,
        message:"group renamed successfully",
    })

})

export const deleteChat=TryCatch(async(req,res)=>{
    const chatId=req.params.id;
    const chat=await Chat.findById(chatId);
    
    if(!chat) return next(new ErrorHandler("Chat not found",404));

    const members=chat.members;
    if(chat.groupChat && chat.creator.toString()!==req.user.toString()){
        return next(new ErrorHandler("you are not alowed to delete the chat",404))
    };

    if(!chat.groupChat && !chat.members.includes(req.user.toString())){
        return next(new ErrorHandler("you are not allowed to delete",403))
    }

    //delete the chat for the given chat id
    const messagesWithAttachments=await Message.find({chat:chatId,attachments:{$exists:true,$ne:[]}});

    const public_ids=[];

    messagesWithAttachments.forEach(({attachments})=>
    (attachments.forEach(({public_id})=>public_ids.push(public_id)))
    )

    await Promise.all([deleteFilesFromCloudinary(public_ids),chat.deleteOne(),Message.deleteMany({chat:chatId})])

    emitEvent(req,REFETCH_CHAT,members);

    return res.status(200).json({
        success:true,
        message:"chat deleted successfully"
    })
})

export const getMessages=TryCatch(async(req,res)=>{
    const chatId=req.params.id;
    const {page =1}=req.query
    const result_page=20;
    const skip=(page-1)*result_page;

    const [messages,totalMessagesCount]=await Promise.all([
        Message.find({chat:chatId})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(result_page)
        .populate("sender","name ")
        .lean(),
        Message.countDocuments({chat:chatId}),
    ])

    const totalpages=Math.ceil(totalMessagesCount/result_page)||0;
    
    return res.status(200).json({
        success:true,
        message:messages.reverse(),
        totalpages
    })
})



