const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    event_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    host_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'events',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Event;
