const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class EventItem extends Model {}

EventItem.init(
  {
    item_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    checklist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    item_info: {
      type: DataTypes.STRING(300),
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'event_items',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventItem;
