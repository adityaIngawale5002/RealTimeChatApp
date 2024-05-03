import { userSocketId } from "../app.js";


export const Getothermember=(members,userId)=>{
    return members.filter((member)=>member._id.toString()!==userId.toString());
}

export const getSockets=(users=[])=>{

    const sockets=users.map((user)=>userSocketId.get(user.toString()));
    return sockets
}


export const getBase64=(file)=>{
    return `data:${file.mimetype}:base64,${file.buffer.toString("base64")}`
};