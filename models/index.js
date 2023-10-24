const User = require('./User');
const Event = require('./Event');
const EventItem = require('./EventItem');

User.hasMany(Event, { foreignKey: 'user_id' });
Event.belongsTo(User, {
  foreignKey: 'user_id',
});
Event.hasMany(EventItem, { foreignKey: 'event_id' });

module.exports = {
    User,
    Event,
    EventItem,
  };