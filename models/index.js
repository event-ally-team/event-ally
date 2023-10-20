const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

/* If another model or table if created modify changes here */
class User extends Model {
}

User.init(
  {
    user_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    email_adr: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwords: {
      allowNull: false,
      type: DataTypes.STRING,
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

class Event extends Model {
}

Event.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    event_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    geolocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
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

class RSVP extends Model {
}

RSVP.init(
  {
    rsvp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'RSVPs',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

class Checklist extends Model {
}

Checklist.init(
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    schedule: {
      type: DataTypes.DATE,
    },
    details_of_task: {
      type: DataTypes.TEXT,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'checklist',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

class Comment extends Model {
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'comments',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

/* Estbalishes the relationships between the DB 
with their foregin keys if another
relationship needs to be estbalished when coding add code to the following
*/
//Users for the "users" table and so om
User.hasMany(Event, { foreignKey: "host_id" });
User.hasMany(Comment, { foreignKey: "user_id" });
User.hasMany(RSVP, { foreignKey: "user_id" });
//Events for the "events" table
Event.hasMany(RSVP, { foreignKey: "event_id" });
Event.belongsTo(User, { foreignKey: "host_id" });
Event.hasMany(Comment, { foreignKey: "event_id" });
Event.hasMany(Checklist, { foreignKey: "event_id" });
//Comments for the "comments" table
Comment.belongsTo(Event,{foreignKey:"event_id"});
Comment.belongsTo(User,{foreignKey:"user_id"});
//RSVP for the "RSVPs" table
RSVP.belongsTo(Event,{foreignKey:"event_id"});
RSVP.belongsTo(User,{foreignKey:"user_id"});
//for the "checklist" table
Checklist.belongsTo(Event,{foreignKey:"event_id"});


module.exports = {User, Event, RSVP, Checklist,Comment,};
