import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { orange } from '../components/constants/color'
import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from '@mui/icons-material'
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import UserItem from '../components/shared/Useritem'
const ConfirmDeleteDialog=lazy(()=>import('../components/dialogs/ConfirmDeleteDialog'))

const AddmemberDialogCom=lazy(()=>import('../components/dialogs/AddmemberDialog'))
import {useChatDetailsQuery, useDeleteGroupMutation, useGetMyGroupsQuery, useRemoverMemberMutation, useRenameGroupMutation } from '../redux/api/api'
import LayoutLoader from '../components/layout/Loaders'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { useDispatch ,useSelector} from 'react-redux'
import { setIsAddMember } from '../redux/reducers/misc'






const Groups = () => {

  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const {isAddMember}=useSelector((state)=>state.misc)

  //fetching all the groups that i have  created by user
  const myGroups=useGetMyGroupsQuery("");
  

  //get the grup details
    const GroupDetails=useChatDetailsQuery({chatId,populate:true},{skip:!chatId})
    

    const [updateGroupName,isGroupNameLoading]=useAsyncMutation(useRenameGroupMutation)
    const [removeMember,isRemoveMemberLoading]=useAsyncMutation(useRemoverMemberMutation)

    const [deleteGroup,isdeleteGroupLoading]=useAsyncMutation(useDeleteGroupMutation)

    //error handling through error hook
    const errors=[{isError:myGroups.isError,error:myGroups.error},{isError:GroupDetails.isError,error:GroupDetails.error}];
    useErrors(errors) 
 
  


 
//removing the members from the group
 const removeMemberHandler =(_id)=>{

  removeMember("removing member...",{chatId:chatId,userId:_id});

 }

 
 

//////////////////////////////////
//button for backnavigation and menu button for handling drawer and slider
const [ismobile, setIsmobile] = useState(false)
const handleMobile = () => {
    setIsmobile(prev => !prev)
  };
  const closeMobile = () => {
    setIsmobile(false)
  }
  const navigateBack = () => {
    navigate("/")
  }
  const IconBtns = (
    <>
      <Box>
        <IconButton sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem"
          }
        }}
          onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>


      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)"
            }
          }}
          onClick={navigateBack}>
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  )
////////////////////////////////////



  

 //////////////////////////////////
 const [isEdit, setIsedit] = useState(false);
  const [groupName,setGroupName]=useState("");
  const [groupNameUpdatedValue,setGroupNameUpdatedValue]=useState("");

 useEffect(()=>{
  if(chatId){
    setGroupName(`group name ${GroupDetails?.data?.name}`)
    setGroupNameUpdatedValue(`group name ${GroupDetails?.data?.name}`)
  }
 

  return ()=>{
    setGroupName("")
    setGroupNameUpdatedValue("")
    setIsedit(false)
  }
},[chatId,GroupDetails.data])


  const updateGroupNameHandler=async()=>{
      setIsedit(false)
      setGroupName(groupNameUpdatedValue)
      updateGroupName("updating group name",{chatId,name:groupNameUpdatedValue})
  }
  const GroupName = (
  <Stack
    direction={"row"}
    alignItems={"center"}
    justifyContent={"center"}
    spacing={"1rem"}
    padding={'3rem'}
  >
        {isEdit ? 
        <>
          <TextField value={groupNameUpdatedValue} onChange={(e)=>{setGroupNameUpdatedValue(e.target.value)}} />
          <IconButton onClick={updateGroupNameHandler} >
            <Done/>
          </IconButton>
        </> 
        :
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => { setIsedit(true) }} disabled={isGroupNameLoading}> <Edit /></IconButton>
        </>}
    </Stack>
    )
///////////////////////////////////////





//////////////////////////////////////
const  [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false)
const OpenconfirmDeleteHandler=()=>{setConfirmDeleteDialog(true)}
const closeconfirmDeleteHandler=()=>{setConfirmDeleteDialog(false)}
const deletehandler=()=>{
  deleteGroup("deleting group",{chatId})
  closeconfirmDeleteHandler()
  navigate("/")
}


const openAddMemberHandler=()=>{
dispatch(setIsAddMember(true))
}


  const ButtonGroup=(
    <Stack direction={{
      sm:"row",xs:"column-reverse"
    }}
    spacing={"1rem"}
    p={{
      sm:"1rem",
      xs:"1rem",
      md:"1rem 4rem"
    }}>
      
      <Button size='large' color='error' startIcon={<Delete/>} onClick={OpenconfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' variant='contained'  startIcon={<Add/>}  onClick={openAddMemberHandler} >Add Member</Button>
     
    </Stack>
  )
//////////////////////////////////////


  return myGroups.isLoading? <LayoutLoader/>
  : (
    <Grid container height={"100vh"}>

      {/* normal grouplist */}
        <Grid item sx={{ display: { xs: "none", sm: "block" }, backgroundColor: orange }} sm={4}>
          <GroupsList myGroups={myGroups?.data.groups} chatId={chatId} />
        </Grid>
      {/* normal grouplist */}



      <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "1rem 3rem" }}>
        {IconBtns}
        {groupName &&
         <> 
            { GroupName }
            <Typography margin={"3rem"} alignSelf={"flex-start"} variant='body1'>
              Members
            </Typography>

           <Stack maxWidth={"45rem"} 
           width={"100%"}
           boxSizing={"border-box"}
           padding={{sm:"1rem",xs:"0",md:"1rem 4rem"}}
           spacing={"2rem"}
           bgcolor={"bisque"}
           height={"50vh"}
           overflow={"auto"}
           >
              {/* member  card*/}
              {isRemoveMemberLoading?<CircularProgress/>:GroupDetails?.data?.members?.map((i,index)=>{
                return <UserItem user={i} key={index} isadded styling={{boxShadow:"0 0 0.5rem 0.5rem rgba(0,0,0,0.2)",padding:"1rem 2rem" ,borderRadius:'1rem'}} handler={removeMemberHandler}/>
              })}
           </Stack>
           {ButtonGroup}
         </>
        }
      </Grid>

      {isAddMember &&
        <Suspense fallback={<Backdrop open />}>
           <AddmemberDialogCom chatId={chatId}/>
        </Suspense>
      }
      {confirmDeleteDialog &&
       <>
       <Suspense fallback={<Backdrop open/>}>
           <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeconfirmDeleteHandler} deletehandler={deletehandler}/>
       </Suspense>
        
      </>}

        {/* Drawer */}
          <Drawer open={ismobile} onClose={closeMobile} sx={{ display: { xs: "block", sm: "none" } }} >
            <GroupsList myGroups={myGroups?.data.groups} chatId={chatId} />
          </Drawer>
        {/* Drawer */}

    </Grid>
  )
}


const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {


  return (
    <Stack width={w} sx={{bgcolor:orange,height:"100%",overflowY:"auto"}}>
      {
        myGroups.length > 0 ? (
          myGroups.map((group, index) => {
            return <GroupListItem group={group} key={index} chatId={chatId} />
          })
        ) : (
          <Typography>
            No groups
          </Typography>
        )
      }
    </Stack>
  )
}

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return <Link to={`?group=${_id}`} onClick={(e) => {
    if (chatId == _id) e.preventDefault();
  }}>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <AvatarCard avatar={avatar} />
      <Typography >{name}</Typography>
    </Stack>
  </Link>


})

export default Groups