const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Checklist extends Model {}

Checklist.init(
  {
    checklist_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'checklists',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Checklist;