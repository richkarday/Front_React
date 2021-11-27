import './App.css';
import Login from "./components/login";
import React, { useEffect }  from 'react';

import Register from "./components/register"
import Client from "./components/client"
import HomeScreen from './components/home';
import OneSignal from 'react-onesignal';
import BookRental from './pages/bookRental'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Libro from './pages/Libros';

function App() {
  useEffect(() => {
    OneSignal.init({
      appId: "823879a6-405f-4a69-80b3-531d05936ada"
    });
  }, []);
  return (
   <Router>
     <Switch>
       <Route exact path="/">
         <Login/>
       </Route>
       <Route path="/signup">
         <Register/>
       </Route>
       <Route  path="/client">
         <Client/>
       </Route>
       <Route path="/books">
         <Libro/>
       </Route>
       <Route path="/home" >
         <HomeScreen />
         </Route>
       <Route path="/bookrental/:idLibro">
         <BookRental/>
       </Route>
     </Switch>
   </Router>
  )
}

export default App;
