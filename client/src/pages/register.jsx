import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Link, useHistory } from 'react-router-dom';
import {Spinner} from './../components/spinner'
import Axios from 'axios';

const Register = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin:"20px auto"}
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '8px 0' }
    const linkStyle = { marginLeft: '5px' }
    const [spinShow, setspinShow] = useState(false)
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const Signup = () => {
        setspinShow(true)
        try{
            Axios.post("http://localhost:3001/usuario", {
              nombre: nombre, 
              apellido: apellido,
              telefono: telefono,
              correo: correo,
              password: password
            }).then((response) => {
                setspinShow(false)
                alert('Usuario registrado con exito')
                console.log(response);
                history.push('/')
            });
        }catch(err) {
            setspinShow(false)
            console.log(err)
        }
    }

    return (
        <Grid>
            {   
                spinShow ? <Spinner></Spinner> : null
            } 
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                <Avatar style={avatarStyle}><PersonOutlineIcon/></Avatar>
                <h2>Sign Up</h2>
                </Grid>
                <TextField label='Name' placeholder='Enter your name' fullWidth required onChange={(event) => {setNombre(event.target.value)}}/>
                <TextField label='Last name' placeholder='Enter your last name' fullWidth required onChange={(event) => {setApellido(event.target.value)}}/>
                <TextField label='Phone' placeholder='Enter your phone' fullWidth required onChange={(event) => {setTelefono(event.target.value)}}/>
                <TextField label='E-Mail' placeholder='Enter email' fullWidth required onChange={(event) => {setCorreo(event.target.value)}}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={(event) => {setPassword(event.target.value)}}/>
                <Button type = 'submit' color = 'primary' variant = "contained" fullWidth style={btnStyle} onClick={Signup}>Sign Up</Button>
                <Typography> You alredy have an account
                    <Link to = "/" style={linkStyle}>Back to login</Link>
                </Typography>
            </Paper>
        </Grid>
    )

}

export default Register