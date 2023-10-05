import React, { useState } from 'react';
import { sendMessage } from '../../api/message';
import { useAuth } from '../../context/AuthContext';
import './MessageForm.css'; 

const MessageForm = () => {
    const { user } = useAuth(); 
  const [receiver_id, setReceiverId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await sendMessage(receiver_id, mensagem, user.token);
      console.log('Mensagem enviada com sucesso:', response);
      setReceiverId('');
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div>
      <h2>Envie uma Mensagem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="receiver_id">ID do Destinatário:</label>
          <input
            type="text"
            id="receiver_id"
            value={receiver_id}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Conteúdo:</label>
          <textarea
            id="content"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
};

export default MessageForm;
