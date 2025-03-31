import './App.css';
import Home from './screens/Home';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from'./screens/Login';
import Nearby from './screens/Nearby';
import Profile from './screens/Profile'
import Signup  from './screens/Signup';
import Recommendation from './screens/Recommendation';
import "bootstrap/dist/css/bootstrap.min.css";  

import "bootstrap/dist/js/bootstrap.bundle.min"; 

function App() {
  return (
    <Router>
    <div > 
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<Home/>}/>

        <Route exact path="/login" element={<Login/>}/>
        <Route exact path='/Recommendation' element={<Recommendation />} />
        <Route exact path="/nearby-store" element={<Store/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/Forecasting" element={<Forecasting/>}/>
  <Route 
            path="/nearby-store" 
            element={<Nearby apiKey="AIzaSyDNL7TjRCN8K2WJsxFN0_AYHUAyitzAfzo" stores={stores} />}
          />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
