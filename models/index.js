const {DataTypes, Model} = require("sequelize");
const sequelize = require("../config/connection")

class users extends Model {}
users.init(
    {
        user_id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        email_adr: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        user_name: {
          type: DATATypes.STRING,
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
        modelName: 'users',
        }
);

module.exports = users;

class events extends Model {}

events.init(
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
  }
);

module.exports = events;

class RSVPs extends Model {}

RSVPs.init(
  {
    rsvpid: {
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
    Status: {
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
  }
);

module.exports = RSVPs;


class checklist extends Model {}

checklist.init(
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
  }
);

module.exports = checklist;

class comments extends Model {}

comments.init(
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
  }
);

module.exports = comments;

//The following  will establish the relationship between the tables
/* Users */ 
users.hasmany(events, { foreginKey: "host_id"});

users.hasmany(comments,{foreginKey: "user_id"});

users.hasmany(RSVPs, {foreginKey: "user_id"});
//Events
events.hasmany(RSVPs, {foreginKey: "event_id"});

events.belongsTo(users, {foreginKey: "host_id"});

events.hasmany(comments, {foreginKey: "event_id"});

events.hasmany(checklist, {foreginKey: "event_id"});
/* RSVPS */
RSVPs.belongsTo(events, {foreginKey: "event_id"});

RSVPs.belongsTo(users, {foreginKey: "user_id"});


//Checklists
checklist.belongsTo(events, {foreginKey: "event_id"});

/*Comments*/
comments.belongsTo(events, { foreignKey: 'event_id' });

comments.belongsTo(users, { foreignKey: 'user_id' });

