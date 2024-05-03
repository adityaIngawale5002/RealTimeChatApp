import React from 'react'
import { Box,  Container, Paper, Stack, Typography} from '@mui/material'
import Adminlayout from '../../components/layout/Adminlayout'
import { AdminPanelSettings, Group, Message, Person } from '@mui/icons-material'
import moment from 'moment'
import { SearchField,CurveButton } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/ChartComp'

const Dashboard = () => {

  const AppBar=(<Paper elevation={3} sx={{padding:"2rem",margin:"2rem 0",borderRadius:"1rem"}}>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{fontSize:"3rem"}}/>
        <SearchField placeholder='Search'/>
        <CurveButton type='submit'>Search</CurveButton>
        <Box flexGrow={1}/>
        <Typography>{moment().format("MMMM Do YYYY")}</Typography>
      </Stack>
  </Paper>)

const widgets=(
  <Stack direction={{xs:"column",sm:"row"}} justifyContent={"space-between"} alignItems={"center"} margin={"2rem 0"}> 
    <Widgets title={"users"} values={24} Icon={<Person/>}/>
    <Widgets title={"chats"} values={3} Icon={<Group/>}/>
    <Widgets title={"Messages"} values={45} Icon={<Message/>}/>

  </Stack>
)
  return (
    <Adminlayout>
      <Container >
          {AppBar}
          <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
              <Paper elevation={3} sx={{padding:"2rem 3.5rem ",borderRadius:"1rem ",width:"100%",maxWidth:"45rem"}}>
                <Typography varient={"h5"}>Last Message</Typography>
                {
                  <LineChart value={[1,44,2]}/>
                }
              </Paper>   
              <Paper 
              elevation={3} sx={{padding:"1rem",borderRadius:'1rem',display:'flex',justifyContent:"center",alignItems:"center",width:{xs:"100%",sm:"505"},position:"relative",width:'100%',maxWidth:"25rem",height:'25rem'}}
              >
                <DoughnutChart/>
                <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={'0.5rem'} width={"100%"} height={"100%"}>
                  <Group/>
                  <Typography>VS</Typography>
                  <Person/>
                </Stack>
              </Paper> 
          </Stack>
          {widgets}
      </Container>
    </Adminlayout>
  )
}

const Widgets=({title,values,Icon})=><Paper elevation={3} sx={{padding:"2rem",margin:"2rem 0",borderRadius:"1rem",width:"20rem"}}>

    <Stack>
      <Typography 
        sx={{
          color:"rgba(0,0,0,0.7)",
          borderRadius:"50%",
          border:"5px solid rgba(0,0,0,0.9)",
          width:"5rem",
          height:"5rem",
          display:'flex',
          justifyContent:"center",
          alignItems:"center"
        }}
      >{values}</Typography>
      <Stack>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
</Paper>

export default Dashboard