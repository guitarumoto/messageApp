import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';


export const sendMessage = async (receiver_id, mensagem, token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/send-message-to-queue`,
            {
                receiver_id,
                mensagem,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMessagesBySenderId = async (sender_id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/messages/${sender_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        throw error;
    }
};