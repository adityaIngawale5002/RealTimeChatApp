import express from 'express'
import { connectDB } from './utils/features.js'
import { router as userRouter} from './routes/user.routes.js'
import { router as chatRouter } from './routes/chat.routes.js'
import {router as adminRouter} from './routes/admin.routes.js'
import { errorMiddleware } from './middleware/error.middleware.js'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import {Server} from 'socket.io';
import { createServer } from 'http'
import {v4 as uuid} from "uuid";
import cors from "cors"
import {v2 as cloudinary} from "cloudinary"
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/events.js'
import { getSockets } from './lib/helper.js'
import { Message } from './models/message.models.js'
import { socketAuthenticator } from './middleware/auth.middleware.js'



const app=express();
const server=createServer(app);
const io=new Server(server,{cors:{origin:"http://localhost:5173",credentials:true}});
app.set("io",io)





//dotenv configer
dotenv.config({
    path:'./.env'
})

//db connection 
connectDB();

//cloudiary setup
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));


app.use('/user',userRouter);
app.use('/chat',chatRouter)
app.use('/admin',adminRouter)



export const userSocketId=new Map();

io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res,async (err)=>{
        await socketAuthenticator(err,socket,next)

    })
})

io.on("connection",(socket)=>{

   
   
    userSocketId.set(socket.user._id.toString(),socket.id)
    socket.on(NEW_MESSAGE,async({chatId,members,messageFromInput})=>{
      
        const messageForRealTime={
            content:messageFromInput,
            _id:uuid(),
            sender:{
                _id:socket.user._id,
                name:socket.user.name
            },
            chat:chatId,
            createdAt:new Date().toISOString(),
        }

        const messageForDb={
            content:messageFromInput,
            sender:socket.user._id,
            chat:chatId
        }
        const membersSocket=getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE,{
             chatId,
             message:messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId})


        try {
            await Message.create(messageForDb);
        } catch (error) {
            console.log("error sending messg",error)
        }
    })


    socket.on("disconnect",()=>{
        console.log("user disconnected")
        userSocketId.delete(socket.user._id.toString());
        
    })
})


app.use(errorMiddleware)

server.listen(process.env.PORT || 3000,()=>{console.log("server is runing on : localhost:3000")})