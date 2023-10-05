'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Message, {
                foreignKey: 'sender_id',
                as: 'sentMessages',
            });
            User.hasMany(models.Message, {
                foreignKey: 'receiver_id',
                as: 'receivedMessages',
            });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
