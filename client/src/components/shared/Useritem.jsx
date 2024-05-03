import { Avatar, IconButton, Typography,ListItem,Stack } from '@mui/material';
import React, { memo } from 'react'
import { Add as AddIcon, Remove } from '@mui/icons-material';
import { transformImage } from '../../lib/Feature';

const UserItem = ({user,handler,handlerIsLoading,isadded=false,styling={}}) => {
const  {name,_id,avatar}=user;

  return (
    <ListItem > 
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} {...styling}>
            <Avatar  src={avatar}/>
         
            <Typography varient="body" sx={{
                flexGlow:1,
                display:"-webkit-box",
                WebkitLineClamp:1,
                WebkitBoxOrient:"vertical",
                overflow:"hidden",
                textOverflow:"ellipsis",
                width:"100%"
                
            }}>{name}</Typography>

            <IconButton  size="small" sx={{bgcolor:"primary.main",color:"white","&:hover":{bgcolor:"primary.dark",border:"50%"}}} onClick={()=>handler(_id)} disabled={handlerIsLoading} >
               { isadded?<Remove color="error" />:<AddIcon />}
            </IconButton>
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)