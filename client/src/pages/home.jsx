import React from 'react';
import '../styles/home.css';
import imgBook from '../assets/book.png';
import OneSignal from 'react-onesignal';
import imgClient from '../assets/people.png';
import imgCoin from '../assets/coin.png';
import { 
    Avatar,
    Button, 
    Typography, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Menu, 
    MenuItem, 
    ListItemIcon, 
    Divider, 
    Tooltip } from '@material-ui/core'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { green } from '@material-ui/core/colors';
import { Link, useHistory } from 'react-router-dom';


const HomeScreen = () =>{
  React.useEffect(() => {
    OneSignal.init({
      appId: "823879a6-405f-4a69-80b3-531d05936ada"
    });
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const name = "Usuario";
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    
    setAnchorEl(null);
  };

  const navigateBooks = () => {
    history.push('/books');
  }
  const navigateClients = () =>{
    history.push('/client')
  }
  const navigateRental = () =>{
    history.push('/bookRental/0')
  }
  let history = useHistory();
    return(
    <div className="mainContainer">
        <AppBar>
            <Toolbar> 
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
                <Typography>Bienvenido {name}</Typography>
            </Toolbar>
        </AppBar>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
            <Avatar> <SettingsOutlinedIcon/> </Avatar> Ajustes
        </MenuItem>
        <MenuItem>
          <Avatar> <ExitToAppOutlinedIcon/> </Avatar> Salir de la cuenta
        </MenuItem>
      </Menu>
      <div className="card" onClick={navigateBooks}>
        <img className="imagePosition" src={imgBook} alt="card book image"/>
        <div className="container">
          <h4><b>Libros</b></h4>
          <p>Administra los libros disponibles o agrega nuevos</p>
        </div>
      </div> <br/>
      <div className="card" onClick={navigateClients}>
        <img className="imagePosition" src={imgClient} alt="card book image"/>
        <div className="container">
          <h4><b>Clientes</b></h4>
          <p>Administra los clientes disponibles o agrega nuevos</p>
        </div>
      </div>
      <div className="card" onClick={navigateRental}>
        <img className="imagePosition" src={imgCoin} alt="card book image"/>
        <div className="container">
          <h4><b>Renta</b></h4>
          <p>Architect & Engineer</p>
        </div>
      </div>
    </div>
    
    );
}

export default HomeScreen;