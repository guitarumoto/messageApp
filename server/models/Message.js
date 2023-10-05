'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.User, {
                foreignKey: 'sender_id',
                as: 'sender',
            });
            Message.belongsTo(models.User, {
                foreignKey: 'receiver_id',
                as: 'receiver',
            });
        }
    }

    Message.init(
        {
            sender_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            receiver_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Message',
        }
    );

    return Message;
};