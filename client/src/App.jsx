import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Notification } from "./components/Notification/Notification";
import Starter from "./components/Starter/Starter";
import { Login } from "./components/Login/Login";
import {useState, useEffect} from "react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("currentUser");
    setUserData(null);
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userData={userData} handleLogout={handleLogout}/>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Starter />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
          <Notification />
        </div>
      </div>
    </Router>
  );
}

export default App;
