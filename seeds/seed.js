const sequelize = require('../config/connection');
const { User, Event, DefaultEventItem } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const defaultEventItemData = require('./defaultEventItemData.json');

const seedDatabase = async () => {
 
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of eventData) {
    await Event.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const defaultEventItem of defaultEventItemData) {
    await DefaultEventItem.create({
      ...defaultEventItem,
    });
  }
  process.exit(0);
};

seedDatabase();
