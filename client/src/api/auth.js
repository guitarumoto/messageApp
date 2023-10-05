import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const authenticateUser = async (username, senha) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      senha,
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};