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

const App = () => {
const [customer, setCustomer] = useState({})
const baseURL = "https://gunnicornskateboards.herokuapp.com/api"

// I think I need a get request here to pull id props after login
  const activeSession = () => {
    axios.get(baseURL )
    // .then((response) => setSomething(response.data))
  }

// A universal add button for order post. I'll add the prop passing for us -CA
  const addButton = (props) => {
      axios.post(baseURL + '/order/' + customer.id)
      
  }


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
                  {/* Maybe we can wrap this in html so it's just the favicon of the cart? */}
        <Link to="/cart">Your Cart</Link>
        </div>
      </nav>
      
      <Routes className='components'>
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
