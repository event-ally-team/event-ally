const sequelize = require('../config/connection');
const {User,Event,RSVP,Checklist,Comment } = require('../models/index');

//Add the data with the columns the exact same order as its respective table
const userData = [
  {
    id: 1,
    email: 'johndoe@gmail.com',
    password: 'TestP@ssword'
  },

  {
    id: 2,
    email: 'test@gmail.com',
    password: 'Test123#'
  }

];

const eventData = [

];


const eventItemData = [

];



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
