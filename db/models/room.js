'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'creator',
      })
      this.hasMany(models.Log, {
        foreignKey: 'room_id',
      })
    }
  }
  Room.init(
    {
      creator: DataTypes.UUID,
      members: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Room',
      tableName: 'rooms',
    }
  )

  return Room
}