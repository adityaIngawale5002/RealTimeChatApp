import React from 'react'
import Applayout from '../components/layout/Applayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
  <Box height={"90vh"} style={{backgroundImage:"linear-gradient(rgb(300,100,100,0.5),rgb(150,100,100,0.5))"}} >
     <Typography p={"2rem"}  varient="h2"  textAlign={"center"}>
      Select a friend to chat
     </Typography>
  </Box>
  )
}

export default Applayout()(Home)