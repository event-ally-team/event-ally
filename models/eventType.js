const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class EventType extends Model {}

EventType.init(
  {
    EventTypeID: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    TypeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'event_types',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventType;