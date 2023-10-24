const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    user_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email_adr: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    passwords: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
  }
);

module.exports = User;
