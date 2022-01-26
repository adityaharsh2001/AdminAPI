import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/insert.component";
import Login from "./components/login.component";
import Details from "./components/details.component";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
function App() {
  useEffect(()=>{
    handleLogin();
  },[])
  
  const [isLogedin, setIsLogedin] = React.useState(false);
  const handleLogin = () => {
    if(getJwt) {
      setIsLogedin(true)
    }
  };
 

  const getJwt = () =>{
    const jwttoken= localStorage.getItem('jwt')
    // console.log(jwttoken)
    return jwttoken
  }
  return (
    <Router>
      <div className="App">
        
        <Navbar></Navbar>
        {isLogedin?<Navigate to='/details' />:
          <Navigate to='/login' />}
        <Routes>
         
          <Route path="/sign-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/details" element={<Details />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
