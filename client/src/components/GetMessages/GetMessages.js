import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMessagesBySenderId } from '../../api/message';
import './GetMessages.css';
import Navbar from '../Navbar/Navbar';

const GetMessages = () => {
    const { user } = useAuth();
    const [userId, setUserId] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSearchMessages = async () => {
        try {
            const response = await getMessagesBySenderId(userId, user.token);
            setMessages(response);
            setError(null);
        } catch (error) {
            setError('Erro ao buscar mensagens.');
        }
    };

    return (
        <div className="get-messages-container">
            <Navbar />
            <h1 className="get-messages-title">Buscar Mensagens por ID do Usuário</h1>
            <div className="search-container">
                <label className="label" htmlFor="userId">ID do Usuário:</label>
                <input
                    type="text"
                    id="userId"
                    className="input"
                    value={userId}
                    onChange={handleUserIdChange}
                    required
                />
                <button className="search-button" onClick={handleSearchMessages}>Buscar Mensagens</button>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="messages-list">
                <h2 className="messages-title">Mensagens Encontradas:</h2>
                <ul className="messages-ul">
                    {messages.map((message) => (
                        <li key={message.id} className="message-li">
                            <strong>ID:</strong> {message.id}
                            <br />
                            <strong>Remetente:</strong> {message.sender_id}
                            <br />
                            <strong>Conteúdo:</strong> {message.content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GetMessages;
