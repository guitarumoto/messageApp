const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const messageController = require('./controllers/messageController');
const authMiddleware = require('./middleware/authMiddleware');
const io = require('./server'); 

module.exports = (io) => {
    router.post('/login', authController.login);
  
    router.post('/register', authController.register);
  
    router.get('/messages/:sender_id', authMiddleware.verifyToken, messageController.getMessagesBySenderId);
  
    router.post('/send-message-to-queue', authMiddleware.verifyToken, (req, res) => {
      messageController.sendMessageToQueueAndWebSocket(req, res, io);
    });
  
    return router;
  };