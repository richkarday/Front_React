import './App.css';
import React, { useEffect }  from 'react';
import Login from "./pages/login";
import Libro from './pages/Libros';
import Register from "./pages/register"
import Client from "./pages/client";
import BookRental from './pages/bookRental'
import HomeScreen from './pages/home';
import OneSignal from 'react-onesignal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
