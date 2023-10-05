import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import GetMessages from './components/GetMessages/GetMessages'; 
import RealTimeChat from './components/RealTimeChat/RealTimeChat'; 

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/get-messages" element={<GetMessages />} />
        <Route path="/chat" element={<RealTimeChat />} />
      </Routes>
    </Router>
  );
}

export default App;