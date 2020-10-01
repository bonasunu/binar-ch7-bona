module.exports = (sequelize, DataTypes) => {
  const PlayerHistory = sequelize.define(
    'PlayerHistory',
    {
      log_id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      level: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
      experience: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      last_login: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'PlayerHistory',
      tableName: 'user_game_history',
    }
  )

  PlayerHistory.associate = (models) => {
    PlayerHistory.belongsTo(models.Player, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
  }

  return PlayerHistory
}
