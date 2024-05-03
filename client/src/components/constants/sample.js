import girl from '../../../public/bg.jpg'
import logo from '../../../public/logo.png'
export const sample=[
    {
        avatar:[girl],
        name:"aditya",
        _id:1,//user id
        groupchat:false,
        members:["1","7"],
    },
    {
        avatar:[logo],
        name:"shubham",
        _id:2,
        groupchat:false,
        members:["2","7"],
    },
    {
        avatar:[girl,girl,girl],
        name:"mandar",
        _id:3,
        groupchat:true,
        members:["3","7","4"],
    }
]

export const sampleMessage=[
    {
        attachments:[
            {
                public_id:"asdsd",
                url:girl
            }
        ],
        content:"hi bro",
        _id:"andi",
        sender:{
            _id:"user._id",
            name:"chaman",
        },
        chat:"chatId",
        createdAt:"2024"
        
    },
    {
        attachments:[
            {
                public_id:"asdsd",
                url:girl
            }
        ],
        content:"hi bro bsdk",
        _id:"andi",
        sender:{
            _id:"asdasd",
            name:"Aditya",
        },
        chat:"chatId",
        createdAt:"2023"
        
    }
]