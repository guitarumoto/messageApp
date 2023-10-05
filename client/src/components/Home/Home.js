import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MessageForm from '../MessageForm/MessageForm';
import './Home.css';
import Navbar from '../Navbar/Navbar'; 

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="content">
        {!user ? (
          <div>
            <p>Você não está autenticado.</p>
            <Link to="/">Faça o login</Link>
          </div>
        ) : (
          <div className="message-form-container">
            <MessageForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
