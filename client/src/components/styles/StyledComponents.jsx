import React from 'react'
import { styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom'
import { gray } from '../constants/color'

export const VisuallyHiddenInput =styled("input")({
border:0,
clip:"rect(0 0 0 0)",
height:1,
margin:-1,
overflow:"hidden",
padding:0,
position:"absolute",
whiteSpace:"nowrap",
width:1,
})

export const Link=styled(LinkComponent)`
text-decoration:none;
color:black;
padding:1rem;
&:hover{
    background-color:#f0f0f0;
}

`

export const InputBox=styled("input")({
 width:"100%",
height:"100%",
fontSize:"large",
border:"none",
outline:"none",
padding:"0 3rem",
borderRadius:"1.5rem",
backgroundColor:`${gray}`
})

export const SearchField=styled("input")`
padding:1rem 2rem;
width:20vmax;
border:none;
outline:none;
border-radius:1.5rem;
backgroung-color:#f1f1f1;
font-size:1.1rem;
`

export const CurveButton=styled("button")`
border-radius:1.5rem;
padding:1rem 2rem;
border:none;
outline:none;
cursor:pointer;
background-color:gray;
color:white;
font-size:1.1rem;
&:hover{
    background-color:rgba(0,0,0,0.8)
}
`