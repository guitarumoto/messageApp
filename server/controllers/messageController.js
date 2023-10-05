const sequelize = require('../sequelize');
const Message = require('../models/Message')(sequelize);
const amqp = require('amqplib');
const jwt = require('jsonwebtoken');
const rabbitmqConfig = require('../rabbitmqConfig');
const redis = require('../redisConfig');
const util = require('util');

const getAsync = util.promisify(redis.get).bind(redis);

async function sendMessageToQueue(data, receiver_id, token, io) {
  try {
    const decodedToken = jwt.verify(token, 'segredo');

    if (decodedToken) {
      const queueName = 'mensagens';

      const connection = await amqp.connect(`amqp://${rabbitmqConfig.host}:${rabbitmqConfig.port}`);
      const channel = await connection.createChannel();

      await channel.assertQueue(queueName);

      const message = JSON.stringify({ mensagem: data, receiver_id: receiver_id, sender_id: decodedToken.id });
      channel.sendToQueue(queueName, Buffer.from(message));

      console.log(`Mensagem enviada para a fila: ${message}`);

    }
  } catch (error) {
    console.error(`Erro ao enviar mensagem para a fila: ${error}`);
  }
}

exports.getMessagesBySenderId = async (req, res) => {
  try {
    const sender_id = req.params.sender_id;
    const cacheKey = `messages:${sender_id}`;
  
    const cachedMessages = await getAsync(cacheKey);

    if (cachedMessages) {
      console.log(`Dados encontrados em cache: ${cachedMessages}`);
      return res.status(200).json(JSON.parse(cachedMessages));
    } else {
      await sequelize.sync();
      const messages = await Message.findAll({ where: { sender_id } });

      await redis.setex(cacheKey, 3600, JSON.stringify(messages));

      console.log(`Dados obtidos do banco de dados: ${messages}`);
      return res.status(200).json(messages);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

exports.sendMessageToQueueAndWebSocket = async (req, res, io) => {
    try {
      const { mensagem, receiver_id } = req.body;
      let token = req.headers.authorization;
      token = token.split(' ')[1];
  
      await sendMessageToQueue(mensagem, receiver_id, token, io);
  
      io.emit('chat message', mensagem);
  
      return res.status(200).json({ message: 'Mensagem enviada para a fila e via WebSocket com sucesso' });
    } catch (error) {
      console.error(`Erro ao enviar mensagem para a fila e via WebSocket: ${error}`);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  };
