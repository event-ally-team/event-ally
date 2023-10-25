const sequelize = require('../config/connection');
const {User,Event, Checklist, EventItem } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const checklistData = require('./checklistData.json');

const db_seed = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(UserJSON);
    await Event.bulkCreate(EventsJSON);
    await Checklist.bulkCreate(ChecklistJSON);
    await RSVP.bulkCreate(RSVPJSON);
    await Comment.bulkCreate(CommentsJSON);
    console.log('The DB seeding worked!!');
  } catch (error) 
  {
    console.error('There is an error trying to seed the DB data ->', error);

  }
}

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

  process.exit(0);
};

seedDatabase();
db_seed();