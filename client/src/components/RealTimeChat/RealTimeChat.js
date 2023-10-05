import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';
import Navbar from '../Navbar/Navbar';
import './RealTimeChat.css';

const RealTimeChat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = io('http://localhost:3000');

        websocket.on('connect', () => {
            websocket.emit('setUserId', user.userId);
        });

        websocket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setWs(websocket);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [user.userId]);

    const handleSendMessage = () => {
        if (ws && newMessage && receiverId && user.userId) {
            const message = {
                sender_id: user.userId,
                receiver_id: receiverId,
                content: newMessage,
            };

            ws.emit('chat message', message);
            setNewMessage('');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="real-time-chat-container">
                <h2>Chat em Tempo Real</h2>
                <div className="message-container">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender_id === user.userId ? 'own-message' : 'other-message'
                                }`}
                        >
                            {message.sender_id === user.userId ? (
                                <span>Você:</span>
                            ) : (
                                <span>{message.sender_id}:</span>
                            )}{' '}
                            {message.content}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="ID do Destinatário"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>

        </div>
    );
};

export default RealTimeChat;
