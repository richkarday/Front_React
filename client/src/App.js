import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import Client from "./components/client"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Libro from './pages/Libros';

function App() {
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
     </Switch>
   </Router>
  )
}

export default App;
