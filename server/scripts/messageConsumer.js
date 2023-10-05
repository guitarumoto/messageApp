const amqp = require('amqplib');
const sequelize = require('../sequelize');
const Message = require('../models/Message')(sequelize);
const rabbitmqConfig = require('../rabbitmqConfig');

const queueName = 'mensagens';

async function startMessageConsumer() {
  try {
    const connection = await amqp.connect(`amqp://${rabbitmqConfig.host}:${rabbitmqConfig.port}`);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    channel.consume(queueName, async (message) => {
      const data = JSON.parse(message.content.toString());

      await sequelize.sync();
      await Message.create({
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        content: data.mensagem,
      });

      console.log(`Mensagem inserida no banco de dados: ${message.content.toString()}`);
    }, {
      noAck: true,
    });

    console.log(`Consumidor RabbitMQ iniciado na fila ${queueName}`);
  } catch (error) {
    console.error(`Erro ao iniciar o consumidor RabbitMQ: ${error}`);
  }
}

startMessageConsumer();
