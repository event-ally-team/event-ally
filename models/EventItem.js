const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class EventItem extends Model {}

EventItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    modelName: 'EventItem',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventItem;
