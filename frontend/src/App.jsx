import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import AddNote from "./pages/AddNote";
import AllNotes from "./pages/AllNotes";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />} />
        <Route path="/notes" element={isAuthenticated ? <AllNotes /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
