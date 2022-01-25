import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SignUp from './components/insert.component'
import Login from './components/login.component'
import Details from './components/details.component'
function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>HOME</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/sign-in' element={<Login/>}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path='/details' element={<Details/>}></Route>
            
          </Routes>
        </div>
      </div>
    </div></Router>
  );
}

export default App;