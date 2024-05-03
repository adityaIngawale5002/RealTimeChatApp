import React from 'react'
import { Button, Container,Paper,  TextField, Typography } from '@mui/material'
import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom';



const AdminLogin = () => {

    const submitHadler=(e)=>{
        e.preventDeafult()
        
    }
    const secretKey=useInputValidation("")

        if(!isAdmin){
            return <Navigate to="/admin/dashboard"/>
        }

  return (
    <div style={{ backgroundImage: "linear-gradient(rgb(300,200,200,0.5),rgb(120,110,220,0.5))",height:"100vh",overflow:"auto" }}>
    <Container component={"main"} maxWidth="xs" sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }} >
        <Paper square={false} elevation={5} sx={{ paddingX: 5, paddingY:4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            
               
                        <Typography variant='h6' >Admin Login</Typography>
                        <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={submitHadler} >

                            <TextField required fullWidth label="secretKey" type='password' value={secretKey.value} onChange={secretKey.changeHandler} margin="normal" variant='outlined' />


                            <Button fullWidth sx={{ marginTop: "1rem" }} variant='contained' color='primary' type='submit'>
                                Login
                            </Button>
                          
                            

                        </form>
                     
            
        </Paper>
    </Container>
</div>
  )
}

export default AdminLogin