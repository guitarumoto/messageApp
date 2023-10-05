const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const amqp = require('amqplib');
const rabbitmqConfig = require('./rabbitmqConfig');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(cors());

const connectedUsers = {};

async function sendMessageToQueue(data) {
  try {
    const queueName = 'mensagens';

    const connection = await amqp.connect(`amqp://${rabbitmqConfig.host}:${rabbitmqConfig.port}`);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    const message = JSON.stringify({ mensagem: data.content, receiver_id: data.receiver_id, sender_id: data.sender_id });
    channel.sendToQueue(queueName, Buffer.from(message));

    console.log(`Mensagem enviada para a fila: ${message}`);
  } catch (error) {
    console.error(`Erro ao enviar mensagem para a fila RabbitMQ: ${error}`);
  }
}

io.on('connection', (socket) => {
  console.log('Um usuário se conectou ao WebSocket');

  socket.on('setUserId', (userId) => {
    connectedUsers[userId] = socket;
  });

  socket.on('chat message', (message) => {
    console.log('Mensagem recebida do cliente via WebSocket:', message);

    if (connectedUsers[message.sender_id]) {
      connectedUsers[message.sender_id].emit('chat message', message);
    }
    if (connectedUsers[message.receiver_id]) {
      connectedUsers[message.receiver_id].emit('chat message', message);
    }

    sendMessageToQueue(message);
  });

  socket.on('disconnect', () => {
    console.log('Um usuário se desconectou do WebSocket');
  });
});

app.use('/api', routes(io));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
