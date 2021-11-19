import React, { useState }  from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import Axios from "axios";



function Login() {

  const Title = 'sign in'

  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    try {
      Axios.post("http://localhost:3001/login" , {
        correo: correo,
        password: password
      }).then((response) => {
          alert("Usted inició sesión")
          console.log(response)
      })    
    }catch(err) {
    	alert("No ingresó bien los datos")
    	console.log(err);
    }
  }

  return (
    <div>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <MuiThemeProvider>
        <div>
        <AppBar title="Login"/>
          <div style={formStyle}>
          <img style={{position: 'relative',width:'20%',display:'inline-block'}} src='https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png'></img>
          <br></br>
          <input
            id="usr_name"
            type="text"
            placeholder="Enter your Username"
            onChange = {(event) => {setCorreo(event.target.value)}}/>
           <br/>
          <input
            id="usr_pwd"
            type="password"
            placeholder="Enter your Password"
            onChange = {(event) => {setPassword(event.target.value)}}/>
          <br/>
            <button id="submit_btn" onClick={login}>Submit</button>
          <br/>
            <Link to="/signup">CREATE AN ACCOUNT</Link>
          </div>
        </div>
        </MuiThemeProvider>
    </div>
  );
}
const style = {
  margin: 15,
 };
 const formStyle = {
   position: 'relative',
  width:'50%',
  left: '50%',
  transform: 'translate(-50%,-0%)',
  textAlign: 'center'

 }; 

export default Login;
