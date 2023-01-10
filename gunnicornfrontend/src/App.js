import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import axios from 'axios'
// import { UserInfoProvider } from './context/UserInfoContext';
import Landing from "./components/Landing";
import Boards from "./components/Boards";
import Softgoods from "./components/Softgoods";
import Team from "./components/Team";
import Media from "./components/Media";
import Error from "./components/Error";
// import Navbar from './components/Navbar';

import Register from "./components/Registration"
import Login from "./components/Login"
import Cart from "./components/Cart"

const App = () => {
const [userData, setUserData ] = useState(null)
const baseURL = "https://gunnicornskateboards.herokuapp.com/api"



  return (
    <Router>
      <nav className='navbar'>
        <h1>Gunnicorn Skateboards</h1>
            
        <div className='navlinks'>
          <Link to="/" ><i class="fa-solid fa-house"></i> Landing.</Link>
          <Link to="/boards"><i className="fa-solid fa-horse"></i> Boards. </Link>
          <Link to="/softgoods"><i className="fa-solid fa-shirt"></i> Softgoods. </Link>
          <Link to="/team"><i className="fa-solid fa-people-group"></i> Team. </Link>
          <Link to="/media"><i className="fa-solid fa-video"></i> Media. </Link>
                  {/* Maybe we can wrap this in html so it's just the favicon of the cart? */}
        <Link to="/cart">Your Cart</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/register'>Sign Up</Link>
        </div>
      </nav>
      {/* <UserInfoProvider> */}
      <Routes className='components'>
          <Route path="/" element={<Landing/>} />
        
          <Route path="/boards" element={<Boards/>} />

          <Route path="/softgoods" element={<Softgoods/>} />

          <Route path="/cart" element={<Cart/>} />

          <Route path="/team" element={<Team/>} />

          <Route path="/media" element={<Media/>} />

          <Route path="/register" element={<Register/>} />

          <Route path="/login" element={<Login/>} />

          <Route path="*" element={<Error/>} />

        </Routes>
      {/* </UserInfoProvider> */}
    </Router>
  );
}

export default App;
