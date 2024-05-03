import React from 'react'
import ProfileCard from '../shared/ProfileCard'
import { Avatar,Stack } from '@mui/material'
import moment from "moment"
import { Face as FaceIcon,AlternateEmail as UserNameIcon,CalendarMonth as CalenderIcon } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { transformImage } from '../../lib/Feature'

const Profile = () => {
  const {user}=useSelector(state=>state.auth)
   
  return (
    <Stack  spacing={'2rem'} alignItems={"center"}>
        <Avatar
            sx={{
                width:200,
                height:200,
                objectFit:"contain",
                marginBottom:"1rem",
                border:"5ps solid white"
            }}
          src={ transformImage(user?.avatar?.url) || ""}
        />
        
        <ProfileCard  heading={"Bio"} text={user?.bio} />
        <ProfileCard  heading={"Username"} text={user?.username} Icon={<UserNameIcon/>}/>
        <ProfileCard  heading={"name"} text={user?.name} Icon={<FaceIcon/>}/>
        <ProfileCard  heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalenderIcon/>}/>
    </Stack>
  )
}

export default Profile