import React, { useState } from 'react'
import { Avatar,Skeleton,Stack,Dialog,DialogTitle, TextField, Typography,ListItem, Button } from '@mui/material'
import UserItem from '../shared/Useritem'
import { useInputValidation } from '6pp'
import { useDispatch,useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import toast from "react-hot-toast"


const NewGroups = () => {

  const dispatch=useDispatch()
  const {isAddMember}=useSelector(state=>state.misc)

  const {isError,isLoading,error,data}=useAvailableFriendsQuery();
 
  const [newGroup,IsLoadingnewGroup]=useAsyncMutation(useNewGroupMutation);
 const groupName=useInputValidation()

//data from api 
 const [members,setMembers]=useState(data?.friends);


//error handling
const errors=[{isError,error}]
useErrors(errors)


//for selecting the member
const [selectedmember,setSelectedMember]=useState([])
 const selectMemberHandler=(_id)=>{
  

  if(selectedmember.includes(_id)){
     setSelectedMember(selectedmember=>selectedmember.filter((member)=>member!==_id))
  }
  else{
    setSelectedMember(prev=>[...prev,_id]);
  }
  
 }


 //submit handler for creating group
const submitHandler=async()=>{

  if(!groupName.value){
    return toast.error("Group name is required")
  }
  if(selectedmember.length<=1){
    return toast.error("please select atleast 2 members")
  }

  await newGroup("creating group...",{name:groupName.value,members:selectedmember})
  
  dispatch(setIsAddMember(false))
}

  return (


    <Dialog open={isAddMember} onClose={()=>{dispatch(setIsAddMember(false))}}>
      <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"} >

        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
           <TextField  label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/> 
           <Typography textAlign={"center"}>Members</Typography>
       {
          <Stack >
            {isLoading?  <Skeleton/>:members?.map((user)=>{
          
              return <ListItem key={user._id}>
                    <UserItem user={user} key={user._id} handler={selectMemberHandler} isadded={selectedmember.includes(user._id)} />
                </ListItem>

            })}
         </Stack>
       }

        <Stack width={"100%"} direction={'row'} justifyContent={"space-evenly"}>
           <Button variant='text' color='error' onClick={()=>{dispatch(setIsAddMember(false))}}>Cancle</Button>
           <Button  onClick={submitHandler} disabled={IsLoadingnewGroup}>Create</Button>
        </Stack>

      </Stack>
    </Dialog>
  )
}

export default NewGroups