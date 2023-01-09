import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import axios from 'axios'

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


function App() {
  return (
    <Router>
      <nav>
        <h1>Gunnicorn Skateboards</h1>
        <Link to="/"> Landing </Link>
        <Link to="/boards"> Boards </Link>
        <Link to="/softgoods"> Softgoods </Link>
        <Link to="/team"> Team </Link>
        <Link to="/media"> Media </Link>
        <Link to="/">Landing</Link>
        <Link to="/boards">Boards</Link>
        <Link to="/softgoods">Softgoods</Link>
        <Link to="/team">Team</Link>
        <Link to="/media">Media</Link>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Log In</Link>
        {/* Maybe we can wrap this in html so it's just the favicon of the cart? */}
        <Link to="/cart">Your Cart</Link>
      
      </nav>
      
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route path="/boards" element={<Boards/>} />

        <Route path="/softgoods" element={<Softgoods/>} />

        <Route path="/team" element={<Team/>} />

        <Route path="/media" element={<Media/>} />

        <Route path="/register" element={<Register/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/cart" element={<Cart/>} />

        <Route path="*" element={<Error/>} />

      </Routes>
    </Router>
  );
}

export default App;
