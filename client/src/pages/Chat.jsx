import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Applayout from '../components/layout/Applayout'
import { Stack,IconButton, Skeleton } from '@mui/material'
import { AttachFile, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import { gray, orange } from '../components/constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import MessageCom from '../components/shared/MessageCom'
import { getSocket } from '../socket'
import {  useChatDetailsQuery, useGetOldMessagesQuery } from '../redux/api/api.js'
import { useErrors, useSocketEvent } from '../hooks/hook.js'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux'
import { setIsFileMenu } from '../redux/reducers/misc.js'
import { removeNewMessagesAlert } from '../redux/reducers/Chat.js'


const Chat = ({chatId,user}) => {
   const dispatch=useDispatch()
    const containerRef=useRef();
    const socket=getSocket();

    //variable to to store the input message from the input filed
    const [messageFromInput,setMessageFromInput]=useState("");

    const [fileMenuAnchor,setFileMenuAnchor]=useState(null);


    //get the details of the chat like members and other things
    const chatDetails=useChatDetailsQuery({chatId,skip:!chatId});
    //here getting members from the chat info got above
    const members=chatDetails?.data?.chat?.members;
  

    //on submit message handler
    const onSubmitHandler=async(e)=>{
      e.preventDefault();
      if(!messageFromInput.trim())return;

      //emiting message to the server
      socket.emit("NEW_MESSAGE",{chatId,members,messageFromInput});
      setMessageFromInput("");
    } 
    

   //getting old messages
    const [page,setpage]=useState(1);
    const oldMessages=useGetOldMessagesQuery({chatId,page});

    //function that allow infinite scrolling and fetch data on scroll
   const {data:oldmessage,setData:setOldMessage}= useInfiniteScrollTop(containerRef,oldMessages?.data?.totalPages,page,setpage,oldMessages?.data?.message)




  //handling socket event for sending and receiving message data
  //function to handle new message event of the socket
  const [messages,setMessages]=useState([]);
  const newMessageHandler=useCallback((data)=>{
        if(data.chatId==chatId){
          setMessages(prev=>[...prev,data.message]);
        }
        
    },[chatId])
 
    // function to handle alert event of the socket
    const alertListner=useCallback((content)=>{
      const messageFromAlert={
        content,
        sender:{
          _id:"",
          name:""
        },
        chat:chatId,
        createdAt:new Date().toISOString(),
      };

      setMessages((prev)=>[...prev,messageFromAlert]);

    },[chatId])


    const eventArrayHandler={
      "NEW_MESSAGE":newMessageHandler,
      "ALERT":alertListner
    }
    //hook to handle the socket event
   useSocketEvent(socket,eventArrayHandler)


   useEffect(()=>{
    dispatch(removeNewMessagesAlert(chatId))

    return ()=>{
    setMessageFromInput("");
    setpage(1);
    setMessages([]);
    setOldMessage([]);
    }
},[chatId])


   //error handling here after error in fethching
   const errors=[{isError:chatDetails.isError,error:chatDetails.error},{isError:oldMessages.isError,error:oldMessages.error}]
   useErrors(errors)

   
 //function to give ref to container and open file menu
    const handleOpenFile=(e)=>{
      dispatch(setIsFileMenu(true));
      setFileMenuAnchor(e.currentTarget);
    }


   //variable to combine all the old and new messages
    const allMessages=[...oldmessage,...messages]



  return (
    
      chatDetails.isLoading?<Skeleton/>
      :
         (  <div  height={"100%"}> 
            <Stack ref={containerRef}  sx={{height:"80vh",overflowX:"hidden",overflowY:"auto"}} bgcolor={"#f0f0f0"} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"}>  

              {
                
                allMessages?.map((message)=>{
                  
                  return <MessageCom message={message} key={message?._id} user={user} />
                })
              }
              
              

            </Stack>

            <form 
              style={{height:"10vh",backgroundColor:gray,borderTop:"1px solid black",}} 
              onSubmit={onSubmitHandler}
            >
              <Stack  direction={"row"} padding={"1rem"}
              height={"100%"}  alignItems={"center"} position={"relative"} >

                <IconButton sx={{position:"absolute",rotate:"30deg"}} onClick={handleOpenFile}>

                  <AttachFile />

                </IconButton>

                <InputBox placeholder='Type message here' value={messageFromInput} onChange={(e)=>{setMessageFromInput(e.target.value)}} />


                <IconButton type='submit' sx={{rotate:"-20deg",backgroundColor:orange,color:"white",marginLeft:"1rem",padding:"0.5rem","&:hover":{backgroungColor:"error.dark",color:"blue"}}} >

                  <Send/>

                </IconButton>

              </Stack>
            </form>

          <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
        </div>)
    
     
  )
}

export default Applayout()(Chat)