const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class EventItem extends Model {}

EventItem.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
    },
    completed: {
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
    modelName: 'eventItem',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventItem;
