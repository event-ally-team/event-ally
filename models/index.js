const User = require('./User');
const Event = require('./Event');
const EventType = require('./eventType');
const Checklist = require('./checklist');
const EventItem = require('./EventItem');

User.hasMany(Event, { foreignKey: 'user_id',

onDelete: 'CASCADE',

});




User.hasMany(Checklist, { foreignKey: 'user_id'});



Event.hasMany(Checklist, { foreignKey: 'event_id' });


Event.hasMany(EventItem, { foreignKey: 'event_id' });



EventType.hasMany(Event, { foreignKey: 'event_type_id' });


module.exports = { User, Event, EventType, Checklist, EventItem};