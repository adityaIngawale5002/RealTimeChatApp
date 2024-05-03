import { Dialog, DialogTitle, Stack, Typography ,Avatar,ListItem,Button, Skeleton} from '@mui/material'
import React, { memo } from 'react'
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'
import { useDispatch,useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'



const Notification = () => {

  const dispatch=useDispatch();
  const {isNotification}=useSelector(state=>state.misc)

  //fetching the notification
  const {isLoading,data,error,isError}=useGetNotificationQuery();


  //handling the request
  const [acceptFriendRequest]=useAcceptFriendRequestMutation()
  useErrors([{error,isError}])


  const friendRequestHandler=async ({_id,accept})=>{
    try {
        const res=await acceptFriendRequest({requestId:_id,accept:accept})
        if(res.data?.success){
            toast.success(res.data?.message)
        }
        else{
          toast.error(res.data?.message || "something went wrong")
        }
    } catch (error) {
      toast.error(error.data?.message || "something went wrong")
    }
    dispatch(setIsNotification(false))
  }


    return (
      
    <Dialog open={isNotification} onClose={()=>{dispatch(setIsNotification(false))}}>
      <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"} >
        <DialogTitle textAlign={"center"}  >Notification</DialogTitle>

        {isLoading? <Skeleton/>
        
           :
          data?.allRequest?.length>0 ?<>
          {data?.allRequest?.map((sender)=>{
            return <NotificationIcon key={sender._id} handler={friendRequestHandler} sender={sender.sender} _id={sender._id} />
          })}
         </>
          :
          <Typography textAlign={"center"}>No Notification</Typography>
        }
      
      </Stack>
    </Dialog>
  )
}

const NotificationIcon=memo(({sender,_id,handler})=>{

  return(
    <ListItem > 
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} >
            <Avatar src={sender.avatar} />
        
            <Typography varient="body1" sx={{
                flexGlow:1,
                display:"-webkit-box",
                WebkitLineClamp:1,
                WebkitBoxOrient:"vertical",
                overflow:"hidden",
                textOverflow:"ellipsis",
                width:"100%"

            }}>{sender.name}</Typography>

            <Stack 
            direction={{xs:"column",sm:"row"}}
            >
                                      
                <Button  onClick={()=>{handler({_id,accept:true})}}>Accept</Button>
                <Button  color='error' onClick={()=>{handler({_id,accept:false})}}>Reject</Button>
            </Stack>
        </Stack>
</ListItem>
  )
})

export default Notification