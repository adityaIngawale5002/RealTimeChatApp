import {body, validationResult, param} from 'express-validator'
import { ErrorHandler } from '../utils/utility.js';

export const validateHandler=(req,res,next)=>{
    const errors= validationResult(req);
    const errorMessage=errors.array().map((error)=>error.msg).join(",");
    
    
    if(errors.isEmpty()){
        
        next(); 

    } 
    else{
       
        next(new ErrorHandler(errorMessage,400))
    };
 }
 

export const signupvalidator=()=>[
    body("name","Pls enter name").notEmpty(),
    body("username","pls enter username").notEmpty(),
    body("password","pls enter password").notEmpty(),
    body("bio","pls enter bio").notEmpty(),
    


];

export const loginvalidator=()=>[
    body("username","pls enter username").notEmpty(),
    body("password","pls enter password").notEmpty(),
  
];

export const newGroupChatValidator=()=>[
    body("name","pls enter name").notEmpty(),
    body("members").notEmpty().withMessage("please enter mebers").isArray({min:2,max:100}),
]

export const addMemberValidator=()=>[
    body("chatId","please enter chat id").notEmpty(),
    body("members")
    .notEmpty()
    .withMessage("pls enter members")
    .isArray({min:1,max:97})
    .withMessage("members must be 1-97")
]

export const removeMemberValidator=()=>[
    body("chatId","pls enter chat Id").notEmpty(),
    body("userId","pls enter user Id").notEmpty()

]
export const leaveGroupValidator=()=>[
    param("id","pls enter id").notEmpty(),
   

]

export const sendAttachmentValidator=()=>[
   body("chatId","pls enter chat Id").notEmpty(),
 
   

]

export const getMessageValidator=()=>[
    param("id","pls enter chat Id").notEmpty(),
 
 ]

 export const renameGroupValidator=()=>[
    param("id","pls enter chat Id").notEmpty(),
    body("name","pls enter name").notEmpty(),
 ]

 export const sendRequest=()=>[
    param("id","pls enter chat Id").notEmpty(),
    body("userId","pls enter use Id").notEmpty(),
 ]
 export const acceptValidator=()=>[
    body("requestId","pls enter request id").notEmpty(),
    body("accept","pls enter status").notEmpty().withMessage("pls accept").isBoolean(),
 ]

 export const adminLoginValidator=()=>[
    body("secretKey","pls enter secter Key").notEmpty()
 ]
