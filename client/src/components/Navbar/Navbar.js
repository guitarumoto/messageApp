import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <h1>MessageApp</h1>
      <Link to="/get-messages" className="nav-link">
        Buscar Mensagens
      </Link>
      <Link to="/home" className="nav-link">
          Enviar Mensagem
      </Link>
      <Link to="/chat" className="nav-link">
          Minhas Mensagens
      </Link>
      {user && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;