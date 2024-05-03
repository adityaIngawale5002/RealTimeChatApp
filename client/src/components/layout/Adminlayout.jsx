import React, { useState } from 'react'
import { Box, Drawer, Grid, IconButton, Stack, Tab, Typography } from '@mui/material'
import {  Close, Dashboard, Group, Logout, ManageAccounts, Menu, Message } from '@mui/icons-material'
import { useLocation,Link as LinkComponent, Navigate } from 'react-router-dom'

import styled from '@emotion/styled'

const adminTabs=[
    {
        name:'Dashboard',
        path:"/admin/dashboard",
        icon:<Dashboard/>
    },
    {
        name:'Users',
        path:"/admin/dashboard",
        icon:<ManageAccounts/>
    },
    {
        name:'Chats',
        path:"/admin/dashboard",
        icon:<Group/>
    },
    {
        name:'Messages',
        path:"/admin/dashboard",
        icon:<Message/>
    }
]

const Link=styled(LinkComponent)`
text-decoration:none;
border-radius:2rem;
padding:1rem 2rem;
color:black;
&:hover:{
    color:rgba(0,0,0,0.54)
}
`

const isAdmin=true;

const Adminlayout = ({children}) => {

if(!isAdmin) return <Navigate to="/admin" />
const [ismobile,setIsmoblie]=useState(false)    
const handleMobile=()=>{setIsmoblie(prev=>!prev)}
const handleClose=()=>{setIsmoblie(false)}


  return (
    <div>
        <Grid container minHeight={"100vh"}>

            <Box sx={{display:{xs:"block",md:"none"},position:"fixed",right:"1rem",top:"1rem"}}>
                <IconButton onClick={handleMobile}>
                    {
                        ismobile? <Close/>:<Menu/>
                    }
                </IconButton>
            </Box>

            <Grid item md={4} lg={3} sx={{display:{xs:"none",md:"block"}}}>
                <Sidebar/>
            </Grid>

            <Grid item xs={12} md={8} lg={9} sx={{bgcolor:"#f5f5f5"}}>
                {children}
            </Grid>

            <Drawer open={ismobile} onClose={handleClose}>
                <Sidebar w='50vw'/>
            </Drawer>
        </Grid>
    </div>
  )
}

const Sidebar=({w="100%"})=>{
    const location=useLocation();
    const logoutHandler=()=>{}
    return (
       <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"} >
             <Typography varient={"h4"} textTransform={"uppercase"}>Chat</Typography>

             <Stack>
                {
                    adminTabs.map((i,index)=>{
                        return <Link key={index} sx={location.pathname===i.path && {bgcolor:"gray",color:"black",":hover":{color:"white"}}} to={i.path}>
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {i.icon}
                                <Typography>{i.name}</Typography>
                            </Stack>
                        </Link>
                    })
                }
                <Link  onClick={logoutHandler} >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                <Logout/>
                                <Typography>Logout</Typography>
                            </Stack>
                        </Link>
             </Stack>
       </Stack>
    )
}

export default Adminlayout