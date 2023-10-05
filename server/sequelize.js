const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  port: 3307,
});

module.exports = sequelize;