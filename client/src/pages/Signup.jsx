import React, { useState }  from 'react';
import { mobile } from "../responsive";
import Axios from 'axios';
import styled from "styled-components";

const Container = styled.div `
    width: 100vw;;
    height: 100vh;
    background: linear-gradient(
    rgba(255,255,255,0.5), 
    rgba(255,255,255,0.5)
    center);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div `
    width:40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })};
    
`
const Form = styled.form `
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.h1 `
    font-size: 24px;
    font-weight:300;
`
const Input = styled.input `
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px; 
`
const Agreement = styled.span `
    font-size: 12px;
    margin: 20px 0px; 
`
const Button = styled.button `
    width: 40%;
    border: none;
    padding: 15px 20px;
    padding-bottom: 15px;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const Register = () => {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    try{
        Axios.post("http://localhost:3001/usuario", {
          nombre: nombre, 
          apellido: apellido,
          telefono: telefono,
          correo: correo,
          password: password
        }).then((response) => {
            alert('Usuario registrado con exito')
            console.log(response);
        });
    }catch(err) {
        console.log(err)
    }
  }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input type="text" placeholder="name" onChange={(event) => {setNombre(event.target.value)}}/>
                    <Input type="text" placeholder="last name" onChange={(event) => {setApellido(event.target.value)}}/>
                    <Input type="text" placeholder="telefono" onChange={(event) => {setTelefono(event.target.value)}}/>
                    <Input type="text" placeholder="email" onChange={(event) => {setCorreo(event.target.value)}}/>
                    <Input type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={addUser}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
