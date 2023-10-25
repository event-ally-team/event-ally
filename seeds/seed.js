const sequelize = require('../config/connection');
const {User,Event,Checklist } = require('../models/index');

//Add the data with the columns the exact same order as its respective table
const UserJSON = [
  {
    user_id: 3,
    user_name: 'Obamna',
    email_adr: 'sryMichelle@gmail.com',
    passwords: 'Foregin Policy'
  }
];

const EventsJSON = [
  {
    event_id: 3,
    event_title: 'funny event',
    geolocation: 'Whitehouse',
    event_date: '2023-10-21 15:30:00',
    details: 'Im trying to think of some',
    host_id: 3
  }
];

const RSVPJSON = [
  {
    rsvp_id: 3,
    status: 'Maybe',
    user_id: 3,
    event_id: 3,
    comments: 'idk'
  }
];

const ChecklistJSON = [
  {
    task_id: 3,
    event_id: 3,
    schedule: '2024-10-20 08:30:00',
    details_of_task: 'I forgot dwag'
  }
  
];

const CommentsJSON = [
  {
    id: 3,
    user_id: 3,
    event_id: 3,
    comment: 'A great time at the event.'
  }
];

const db_seed = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(UserJSON);
    await Event.bulkCreate(EventsJSON);
    await Checklist.bulkCreate(ChecklistJSON);
    await RSVP.bulkCreate(RSVPJSON);
    await Comment.bulkCreate(CommentsJSON);
    console.log('The DB seeding worked!!');
  } catch (error) {
    console.error('There is an error trying to seed the DB data ->', error);
  }
};

db_seed();
