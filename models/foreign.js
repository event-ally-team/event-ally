const User = require('./User');
const Event = require('./Event');
const EventType = require('./event-type');
const Checklist = require('./checklist');
const EventItem = require('./event-item');

User.hasMany(Event, { foreignKey: 'host_id' });
User.hasMany(Checklist, { foreignKey: 'event_id' });
Event.hasMany(Checklist, { foreignKey: 'event_id' });
Event.hasMany(EventItem, { foreignKey: 'checklist_id' });
EventType.hasMany(Event, { foreignKey: 'event_type_id' });
