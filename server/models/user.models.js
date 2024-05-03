
import mongoose from 'mongoose';
import {hash} from 'bcrypt'


const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            select:false,
        },
        avatar:{
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,

            }
        },
        bio:{
            type:String,

        }
},{timeStamp:true})

userSchema.pre('save',async function(){
   
    if(!this.isModified("password"))  return next();

    this.password=await hash(this.password,10);
   
})

export const User=mongoose.model("User",userSchema);