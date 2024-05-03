import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { setIsAddMember } from '../../redux/reducers/misc'
import UserItem from '../shared/Useritem'



const AddmemberDialogCom = ({chatId}) => {

  const dispatch=useDispatch();
  const {isAddMember}=useSelector((state)=>state.misc)
  const [addMember,isAddMEmberLoading]=useAsyncMutation(useAddMemberMutation)
  const {isLoading,data,isError,error}=useAvailableFriendsQuery(chatId)
 
const [selectedmember,setSelectedMember]=useState([])


 const selectMemberHandler=(_id)=>{
  
  setSelectedMember(prev=>prev.includes(_id)?prev.filter((curEle)=>curEle!==_id):[...prev,_id])
  
 }
 
 const addFriendSubmitHandler=()=>{
   addMember("Adding the members",{members:selectedmember,chatId})
   setSelectedMember([])
   dispatch(setIsAddMember(false))
 }

 const closeHandler=()=>{
  dispatch(setIsAddMember(false))
 } 
 useErrors([{isError,error}])
 
  return (
   <Dialog open={isAddMember} onClose={closeHandler}>
     <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'}>
            Add member
        </DialogTitle>
        <Stack>
          {isLoading? <Skeleton/>: data?.friends.length >0 ?
                data?.friends.map(i=>{
                    return <UserItem key={i._id} user={i} handler={selectMemberHandler} isadded={selectedmember.includes(i._id)}/>
                }):
                <Typography textAlign={'center'}>No friend</Typography>
            }
        </Stack>
        <Stack direction={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}>
          <Button  variant='contained' onClick={addFriendSubmitHandler} disabled={isAddMEmberLoading}>Submit</Button>
          <Button color='error' onClick={closeHandler}>Cancle</Button>
        </Stack> 
       
     </Stack>
   </Dialog>
  )
}

export default AddmemberDialogCom