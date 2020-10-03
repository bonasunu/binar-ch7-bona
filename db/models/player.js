'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      this.hasMany(models.Room, {
        foreignKey: 'creator',
      })
    }
  }
  Player.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'user_game',
    }
  )

  return Player
}
