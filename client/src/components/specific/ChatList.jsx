import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[{chatId:'',count:0,}],
    handleDeleteChat
}) => {
 
  return (
    <Stack width={w} direction={"column"} sx={{overflowY:'auto'}}>
        {
            
            chats?.map((data)=>{
              const {avatar,name,_id,groupchat,members}=data;
              const newMessageAlert=newMessagesAlert.find(({chatId})=>chatId==_id);
              const isonline=members?.some((member)=>onlineUsers.includes(_id));
             
                return <ChatItem 
                  newMessageAlert={newMessageAlert}
                  isonline={isonline}
                  avatar={avatar}
                  name={name}
                  _id={_id}
                  key={_id}
                  groupchat={groupchat}
                  samesender={chatId==_id}
                  handleDeleteChat={handleDeleteChat}
                />
            })
            
        }
    </Stack>
  )
}

export default ChatList