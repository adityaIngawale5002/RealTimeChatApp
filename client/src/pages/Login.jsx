import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { CameraAlt as CameraAlIcon } from "@mui/icons-material"
import React, { useState } from 'react'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import { useFileHandler, useInputValidation, } from "6pp";
import { UsernameValidator } from '../utils/Validators';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExists, userNotExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';



const Login = () => {


    const dispatch=useDispatch();
    const [islogin, setLogin] = useState(true)
    const toggleLogin = () => setLogin(prev => !prev)


    //input validation
    const name = useInputValidation("")
    const bio = useInputValidation("")
    const username = useInputValidation("", UsernameValidator)
    const password = useInputValidation("")
    const avatar = useFileHandler("single");



    //form handling functions
    const handleSignup = async(e) => { 
        e.preventDefault();
        const formData=new FormData();
        formData.append("avatar",avatar.file);
        formData.append("name",name.value);
        formData.append("username",username.value);
        formData.append("bio",bio.value);
        formData.append("password",password.value);

        try {
            const response=await axios.post("http://localhost:3000/user/signup",
            formData,
            {   withCredentials:true,
                headers:{"Content-Type":"multipart/form-data"}
            })
            dispatch(userExists(response.data?.user))
            toast.success(response.data?.message)
        } catch (error) {
            console.log("errror in sign up",error);
            dispatch(userNotExists());
            toast.error(error.response.data?.message);
            
        }


    }



    const handleLogin =async (e) => { 
        
        e.preventDefault();
        try {
           const response= await axios.post("http://localhost:3000/user/Login",
            {username:username.value,password:password.value},
            {
                withCredentials:true,
                headers:{
                "Content-Type":"application/json"
            }}
           )
        
           dispatch(userExists(response.data?.user))
           toast.success(response.data?.message)
        } catch (error) {
            toast.error(error.response.data?.message )
        }
        
    }
   
    return (
        <div style={{ backgroundImage: "linear-gradient(rgb(300,200,200,0.5),rgb(120,110,220,0.5))",height:"100vh",overflow:"auto" }}>
            <Container component={"main"} maxWidth="xs" sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }} >
                <Paper square={false} elevation={5} sx={{ paddingX: 5, paddingY: islogin?4:0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {
                        islogin ?
                            <>
                                <Typography variant='h6' >Login</Typography>
                                <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin} >

                                    <TextField required fullWidth label="username" value={username.value} onChange={username.changeHandler} margin="normal" variant='outlined' />

                                    <TextField required fullWidth label="password" type='password' value={password.value} onChange={password.changeHandler} margin="normal" variant='outlined' />
                                    <Button fullWidth sx={{ marginTop: "1rem" }} variant='contained' color='primary' type='submit'>
                                        Login
                                    </Button>
                                    <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
                                    <Button fullWidth variant='text'  onClick={toggleLogin}>
                                        Signup
                                    </Button>

                                </form>
                            </>
                            :
                            <>
                                <Typography variant='h5' >Signup</Typography>
                                <form style={{ width: "100%" }} onSubmit={handleSignup}>
                                    <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                        <Avatar sx={{ width: "10rem", height: "10rem", objectFit: 'contain' }} src={avatar.preview} />

                                        <IconButton sx={{ position: "absolute", bottom: "0", right: "0", color: "white", bgcolor: "rgba(0,0,0,0.5)", ":hover": { bgcolor: "rgba(0,0,0,0.8)", color: "white" } }} component="label">
                                            <>
                                                <CameraAlIcon />
                                                <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                            </>
                                        </IconButton>
                                    </Stack>
                                    {avatar.error && (
                                        <Typography color="error" width={"fit-content"} display={"block"} variant='caption'>{avatar.error}</Typography>
                                    )}
                                    <TextField required fullWidth label="Name" margin="normal" variant='outlined' value={name.value} onChange={name.changeHandler} />
                                    <TextField required fullWidth label="Bio" margin="normal" variant='outlined' value={bio.value} onChange={bio.changeHandler} />
                                    <TextField required fullWidth label="username" margin="normal" variant='outlined' value={username.value} onChange={username.changeHandler} />

                                    {username.error && (
                                        <Typography color="error" variant='caption'>{username.error}
                                        </Typography>
                                    )}

                                    <TextField required fullWidth label="password" type='password' margin="normal" value={password.value} onChange={password.changeHandler} variant='outlined' />
                                    {password.error && (
                                        <Typography color="error" variant='caption'>{password.error}</Typography>
                                    )}

                                    <Button fullWidth variant='contained' color='primary' type='submit'>
                                        Signup
                                    </Button>
                                    <Typography textAlign={"center"} >OR</Typography>
                                    <Button fullWidth variant='text'  onClick={toggleLogin}>
                                        Login
                                    </Button>

                                </form>
                            </>
                    }
                </Paper>
            </Container>
        </div>
    )
}

export default Login