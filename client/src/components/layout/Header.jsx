import { AppBar, Backdrop, Box, IconButton,  Toolbar, Tooltip, Typography, Badge} from '@mui/material'
import {Add as AddIcon ,  Group as GroupIcon, Logout, Menu as MenuIcon,Notifications as NotificationsIcon,Search as SearchIcon } from "@mui/icons-material"
import { orange } from '../constants/color'
import {useNavigate} from "react-router-dom"
import React,{Suspense,lazy, useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import toast from 'react-hot-toast'
import { setIsAddMember, setIsMobileMenuFriend, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
const Search=lazy(()=>import('../specific/Search'))
const Notification=lazy(()=>import("../specific/Notification"))
const NewGroups=lazy(()=>import("../specific/NewGroups"))
import { useSelector } from 'react-redux'
import { resetNotification } from '../../redux/reducers/Chat'


const Header = () => {
const dispatch=useDispatch()
const navigate=useNavigate()



//for header functions
const { isSearch,isNotification,isAddMember}=useSelector(state=>state.misc)
const openSearchLog=()=>{dispatch(setIsSearch(true))}
const openNewGroup=()=>{dispatch(setIsAddMember(true))}
const HandleNotification=()=>{
  dispatch(setIsNotification(true))
  dispatch(resetNotification())
}
const {notification}=useSelector(state=>state.chat)
 

//for mobile screen app icon
const handleMobile=()=>{
  dispatch(setIsMobileMenuFriend(true))
}



//navigate to /groups page
const NavigateToGroup=()=>{navigate("/groups")}

//logout handler
const LogoutHandler=()=>{
  
    axios.get("http://localhost:3000/user/logout",{withCredentials:true})
    .then((response)=>{
      dispatch(userNotExists());
      toast.success(response.data.message);
    })
    .catch((error)=>{
      toast.error(error.response.data.message);
    })  
  }


  
  return (
    <>
        <Box sx={{flexGrow:1,height:"4rem"}} >
          <AppBar position='static' sx={{bgcolor:orange}} >

            <Toolbar>
              <Typography variant="h5" sx={{display:{xs:"none",sm:'block'}}} >Chat</Typography>

              <Box sx={{display:{xs:'block',sm:"none"},}}>
                  <IconButton onClick={handleMobile}>
                    <MenuIcon />
                  </IconButton>
              </Box>

              <Box sx={{flexGrow:1}}/>

              <Box >

                <IconBtn title={"search"} icon={<SearchIcon/>} onClick={openSearchLog}/>
                
                <IconBtn title={"New Group"} icon={<AddIcon/>} onClick={openNewGroup}/>
                  
                <IconBtn title={"Manage Groups"} icon={<GroupIcon/>} onClick={NavigateToGroup}/>

                <IconBtn title={"Notification"} value={notification} icon={<NotificationsIcon/>} onClick={HandleNotification}/>
                
                <IconBtn title={"Logout"} icon={<Logout/>} onClick={LogoutHandler}/>
                
              </Box>


            </Toolbar>
            
          </AppBar>

        </Box>
        

        {isSearch &&
          <Suspense fallback={<Backdrop open />}>
            <Search/>
          </Suspense>
        }

        {isNotification &&
          <Suspense fallback={<Backdrop open />}>
             <Notification/>
          </Suspense>
        } 

        {isAddMember &&
          <Suspense fallback={<Backdrop open />}>
              <NewGroups/>
          </Suspense>
        }
     </>
  )
}

const IconBtn=({title,icon,onClick,value})=>{

  return(
    <Tooltip title={title} arrow>
        <IconButton color="inherit" size="large" onClick={onClick} >
          {value? <Badge badgeContent={value} color={"error"}>{icon}</Badge>:icon}
        
        </IconButton>
   </Tooltip>
  )
}

export default Header