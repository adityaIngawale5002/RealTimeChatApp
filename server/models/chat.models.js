import mongoose, { Types } from "mongoose";

const ChatSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    groupChat:{
        type:Boolean,
        default:false,
    },
    creator:{
        type:Types.ObjectId,
        ref:"User"
    },
    members:[
        {
            type:Types.ObjectId,
            ref:"User",
        }
            ],
    
},{timestamps:true})


export const Chat=mongoose.model("Chat",ChatSchema);