import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, FormControlLabel, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link, useHistory } from 'react-router-dom';
import {Spinner} from './../components/spinner'
import Axios from 'axios';

const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin:"20px auto"}
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '8px 0' }
    const linkStyle = { marginLeft: '5px' }
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [spinShow, setspinShow] = useState(false)
    let history = useHistory();

    const login = () => {
        setspinShow(true)
          Axios.post("http://localhost:3001/login" , {
            correo: correo,
            password: password
          }).then((response) => {
            setspinShow(false)
            history.push('/home');
          }).catch((err) => {
            setspinShow(false)
            alert("No ingresó bien los datos")
            console.log(err);
          }) 
        
    }

    return (
        <Grid>
            {   
                spinShow ? <Spinner></Spinner> : null
            } 

            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
                </Grid>
                <TextField label='E-Mail' placeholder='Enter email' fullWidth required onChange = {(event) => {setCorreo(event.target.value)}}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange = {(event) => {setPassword(event.target.value)}}/>
                <FormControlLabel
                    control = {
                        <Checkbox
                            name = "checkedB"
                            color = "primary"
                        />
                    }
                    label = "Remember me"
                />
                <Button type = 'submit' color = 'primary' variant = "contained" fullWidth style={btnStyle} onClick={login}>Sign In</Button>
                <Typography>
                    <Link to = "/">Forgot password ?</Link>
                </Typography>
                <Typography> Do you have an account ? 
                    <Link to = "/signup" style={linkStyle}>Sign up</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login