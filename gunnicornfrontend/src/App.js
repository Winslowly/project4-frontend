
// import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Landing from "./components/Landing";
import Boards from "./components/Boards";
import Softgoods from "./components/Softgoods";
import Team from "./components/Team";
import Media from "./components/Media";
import Error from "./components/Error";


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Landing</Link>
        <Link to="/boards">Boards</Link>
        <Link to="/softgoods">Softgoods</Link>
        <Link to="/team">Team</Link>
        <Link to="/media">Media</Link>
      
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
