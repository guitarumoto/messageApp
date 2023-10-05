# Instruções para rodar o projeto
## Ambiente
O banco de dados utilizado foi o MySQL, as configurações deste se encontram no arquivo 'dbConfig.js' e 'config.json' (para migrations).
O nome do banco é 'fullstack'.

É necessário rodar o REDIS e o RabbitMQ. Estes foram utilizados em suas portas padrão. <br>
PS: Podem ser alterados no arquivo 'redisConfig.js' e 'rabbitmqConfig.js'.

## Redis
### `sudo service redis-server start`

## RabbitMQ
### `rabbitmq-server start`

## No diretório 'exame/server'
Instale as dependências
### `npm install`
Rodar migrations para criação de tabelas
### `npx sequelize-cli db:migrate`
### `npm start`

## No diretório 'exame/server/scripts'
Para subir o serviço de escrita
### `node messageConsumer.js`

## No diretório 'exame/client'
Instale as dependências
### `npm install`
### `npm start`

## Teste
Para testar será necessário criar usuários via Postman ou qualquer testador HTTP<br>
O endpoint a ser chamado é: <br>
http://localhost:3000/api/register<br>
<br>

A payload a ser enviada: <br>
{<br>
    "username": "nomedousuario",<br>
    "senha": "senhaQueVaiSerEncriptada"<br>
}

<br>
Após esses passos o sistema esta pronto para uso!