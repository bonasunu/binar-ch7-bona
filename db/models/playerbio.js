module.exports = (sequelize, DataTypes) => {
  const PlayerBio = sequelize.define(
    'PlayerBio',
    {
      uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
      },
      last_name: { type: DataTypes.STRING, defaultValue: '', allowNull: false },
      city: { type: DataTypes.STRING, defaultValue: '', allowNull: false },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'PlayerBio',
      tableName: 'user_game_biodata',
    }
  )

  PlayerBio.associate = (models) => {
    PlayerBio.belongsTo(models.Player, {
      foreignKey: 'uid',
    })
  }
  return PlayerBio
}
