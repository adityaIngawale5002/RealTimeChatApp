import { Stack, Typography,Box } from '@mui/material'
import React from 'react'

const ProfileCard = ({text,Icon,heading}) => {

  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>

        <Box>{Icon && Icon}</Box>

        <Stack>
            <Typography varient={"caption"}>{text} </Typography>
            <Typography varient={"h5"} >{heading} </Typography>
        </Stack>
    </Stack>
  )
}

export default ProfileCard