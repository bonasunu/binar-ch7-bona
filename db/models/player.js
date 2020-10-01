module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    'Player',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1,
      },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'user_game',
    }
  )
  Player.associate = (models) => {
    Player.hasOne(models.PlayerBio, {
      foreignKey: {
        name: 'uid',
        allowNull: false,
      },
    })

    Player.hasMany(models.PlayerHistory, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    })
  }
  return Player
}
