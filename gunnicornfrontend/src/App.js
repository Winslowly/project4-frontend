import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Landing from "./components/Landing";
import Boards from "./components/Boards";
import Softgoods from "./components/Softgoods";
import Team from "./components/Team";
import Media from "./components/Media";
import Error from "./components/Error";
import Navbar from './components/Navbar';




function App() {
  return (
    <Router>
      <nav className='navbar'>
        <h1>Gunnicorn Skateboards</h1>
        <div className='navlinks'>
          <Link to="/" ><i class="fa-solid fa-house"></i> Landing.</Link>
          <Link to="/boards"><i class="fa-solid fa-horse"></i> Boards. </Link>
          <Link to="/softgoods"><i class="fa-solid fa-shirt"></i> Softgoods. </Link>
          <Link to="/team"><i class="fa-solid fa-people-group"></i> Team. </Link>
          <Link to="/media"><i class="fa-solid fa-video"></i> Media. </Link>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route path="/boards" element={<Boards/>} />

        <Route path="/softgoods" element={<Softgoods/>} />

        <Route path="/team" element={<Team/>} />

        <Route path="/media" element={<Media/>} />

        <Route path="*" element={<Error/>} />

      </Routes>
    </Router>
  );
}

export default App;
