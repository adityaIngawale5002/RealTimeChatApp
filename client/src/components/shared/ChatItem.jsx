import React from 'react'
import { Link } from '../styles/StyledComponents'
import { Stack, Typography,Box } from '@mui/material'
import { memo } from 'react'
import AvatarCard from './AvatarCard'
const ChatItem = ({
    avatar=[],
    name,
    _id,
    isonline,
    samesender,
    newMessageAlert,
    groupchat=false,
    index=0,
    handleDeleteChat
}) => {
    
  return (
    <>
        <Link to={`/chat/${_id}` }  sx={{padding:"0"} } onContextMenu={(e)=>{handleDeleteChat(e,_id,groupchat)}}>
            <div style={{
                display:"flex",
                gap:"1rem",
                alignItems:"center",
                padding:"1rem",
                backgroundColor:samesender?"rgb(1,1,1,0.3)":"unset",
                color:samesender?"white":"unset",
                justifyContent:"spacing-between",
                position:"relative"
            }}>
                
                <AvatarCard avatar={avatar}/>
                <Stack>
                    <Typography>{name}</Typography>
                    {   newMessageAlert 
                        &&
                        <Typography>
                            {newMessageAlert.count} New Messages
                        </Typography>
                    
                    }
                </Stack>

              {  isonline 
                    &&
                    <Box 
                    sx={{
                        width:"10px",
                        height:"10px",
                        borderRadius:"50%",
                        backgroundColor:"green",
                        position:"absolute",
                        top:"50%",
                        right:"1rem",
                        transfrorm:"translateY(-50%)"
                    }}
                    />              
              }

            </div>
        </Link>
    </>
  )
}

export default memo(ChatItem)