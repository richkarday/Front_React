import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import User from './pages/users';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
       <Route path="/users">
         <User/>
       </Route>
     </Switch>
   </Router>
  )
}

export default App;
