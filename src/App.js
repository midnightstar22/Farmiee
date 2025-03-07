import './App.css';
import Home from './screens/Home';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from'./screens/Login';

import "bootstrap/dist/css/bootstrap.min.css";  

import "bootstrap/dist/js/bootstrap.bundle.min"; 

function App() {
  return (
    <Router>
    <div > 
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;
