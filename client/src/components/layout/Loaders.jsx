import React from 'react'
import { Container, Grid,Skeleton,Stack } from '@mui/material'
const LayoutLoader = () => {
  return (
    <>  
    
            <Grid> <Skeleton varient="rectangular" height={'4rem'}/></Grid>
              <Grid  container sx={{height:"calc(100vh-4rem)"}} spacing={'1rem'}  >
                  


                      <Grid item sx={{display:{xs:"none",sm:"block"}}} height={"100%"} sm={4} md={3} lg={3} >
                          <Skeleton varient="rectangular"  sx={{height:"90vh"}} />
                      </Grid>

                      <Grid item xs={12} sm={8} md={5} lg={6} sx={{height:"100%"}} >
                          <Skeleton varient="rectangular" sx={{height:'90vh'}}/>
                
                      </Grid>

                      <Grid item    md={4}  lg={3} sx={{display:{xs:"none",md:"block"},height:"100%"}}  >
                          <Skeleton width={"full"} sx={{height:'90vh'}} varient="rectangular"/>
                      </Grid>

              </Grid>
      
           
    </>
  )
}

export default LayoutLoader