import './App.css';
import Login from "./pages/login" 
import Singup from "./pages/Signup"
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
         <Singup/>
       </Route>
     </Switch>
   </Router>
  )
}

export default App;
