const User = require('./User');
const Event = require('./Event');
const EventItem = require('./EventItem');
const DefaultEventItem = require('./DefaultEventItem');

User.hasMany(Event, { foreignKey: 'user_id',
onDelete: 'CASCADE',
});
Event.belongsTo(User, { foreignKey: 'user_id' });

Event.hasMany(EventItem, { foreignKey: 'event_id' });
EventItem.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = { User, Event, EventItem, DefaultEventItem};