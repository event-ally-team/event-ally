const sequelize = require('../config/connection');
const { User, Event, EventItem } = require('../models');

const userData = [
  {
    id: 1,
    email: 'johndoe@gmail.com',
    password: 'TestP@ssword',
  },
  {
    id: 2,
    email: 'test@gmail.com',
    password: 'Test123#',
  },
];
const eventData = [
  {
    title: "John's Birthday Party",
    type: 'Birthday',
    start_date: new Date('2023-11-10'),
    end_date: new Date('2023-11-10'),
  },
  {
    title: "Sara's Graduation Ceremony",
    type: 'Graduation',
    start_date: new Date('2023-12-15'),
    end_date: new Date('2023-12-15'),
  },
  {
    title: "Emily and Mark's Wedding",
    type: 'Wedding',
    start_date: new Date('2023-09-20'),
    end_date: new Date('2023-09-20'),
  },
  {
    title: "New Baby's Arrival",
    type: 'Birth',
    start_date: new Date('2023-04-05'),
    end_date: new Date('2023-04-05'),
  },
  {
    title: "Summer Vacation in Europe",
    type: 'Vacations',
    start_date: new Date('2023-07-15'),
    end_date: new Date('2023-08-05'),
  },
  {
    title: "Business Trip to New York",
    type: 'Travel',
    start_date: new Date('2023-06-10'),
    end_date: new Date('2023-06-15'),
  },
  {
    title: "Achievement Award Ceremony",
    type: 'Achievement',
    start_date: new Date('2023-03-20'),
    end_date: new Date('2023-03-20'),
  },
  {
    title: "Career Milestone Celebration",
    type: 'Career',
    start_date: new Date('2023-02-10'),
    end_date: new Date('2023-02-10'),
  },
  {
    title: "Pet's Birthday Party",
    type: 'Pets',
    start_date: new Date('2023-07-02'),
    end_date: new Date('2023-07-02'),
  },
  {
    title: "Family Reunion",
    type: 'Family',
    start_date: new Date('2023-08-25'),
    end_date: new Date('2023-08-27'),
  },
  {
    title: "Campaign Kickoff Event",
    type: 'Campaigns',
    start_date: new Date('2023-05-01'),
    end_date: new Date('2023-05-01'),
  },
  {
    title: "Fundraising for a Cause",
    type: 'Causees',
    start_date: new Date('2023-06-08'),
    end_date: new Date('2023-06-08'),
  },
  {
    title: "Solidarity March",
    type: 'Solidarity',
    start_date: new Date('2023-04-22'),
    end_date: new Date('2023-04-22'),
  },
  {
    title: "Charity Gala",
    type: 'Charity',
    start_date: new Date('2023-07-30'),
    end_date: new Date('2023-07-30'),
  },
  {
    title: "Hobby Expo",
    type: 'Hobbies',
    start_date: new Date('2023-09-15'),
    end_date: new Date('2023-09-17'),
  },
  {
    title: "Holiday Getaway",
    type: 'Holidays',
    start_date: new Date('2023-12-24'),
    end_date: new Date('2023-12-31'),
  },
  {
    title: "Investment Seminar",
    type: 'Investments',
    start_date: new Date('2023-02-28'),
    end_date: new Date('2023-03-02'),
  },
  {
    title: "Fashion Show",
    type: 'Clothing',
    start_date: new Date('2023-05-05'),
    end_date: new Date('2023-05-05'),
  },
];

const predefinedEventItems = [
  {
    title: "Select Venue",
    description: "Decide where the party will be held.",
  },
  {
    title: "Create Guest List",
    description: "Make a list of people you want to invite and gather their contact information.",
  },
  {
    title: "Choose Theme",
    description: "Decide on a theme for the party, if desired (e.g., superhero, princess, retro, etc.).",
  },
  {
    title: "Send Invitations",
    description: "Create and send out invitations, whether physical or digital.",
  },
  {
    title: "Plan Entertainment",
    description: "Organize games and activities suitable for the guests' interests.",
  },
  {
    title: "Arrange Food & Drinks",
    description: "Decide on the menu, including cake and beverages.",
  },
  {
    title: "Decoration",
    description: "Decorate the venue to match the chosen theme.",
  },
  {
    title: "Cake & Dessert",
    description: "Order or bake a birthday cake and other desserts.",
  },
  {
    title: "Party Favors",
    description: "Prepare goody bags or party favors for guests.",
  },
  {
    title: "Music & Entertainment",
    description: "Set up a music playlist or hire a DJ, and arrange any entertainment you have planned.",
  },
  {
    title: "Gifts",
    description: "Coordinate the opening of gifts, if desired.",
  },
  {
    title: "Photography",
    description: "Assign someone to capture photos and videos throughout the event.",
  },
  {
    title: "Safety Precautions",
    description: "Ensure the venue is safe and secure for all guests.",
  },
  {
    title: "Budget",
    description: "Create a budget for the party to manage expenses.",
  },
];


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of eventData) {
    const createdEvent = await Event.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    
    const maxEventItems = 5; /* Number of event items for each event */
    /* this coresponds to the events that are created */

    for (let i = 0; i < maxEventItems; i++) {
      const itemData = predefinedEventItems[i % predefinedEventItems.length]; 
      await EventItem.create({
        title: itemData.title,
        description: itemData.description,
        is_completed: false,
        event_id: createdEvent.id,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  }
  process.exit(0);
};


seedDatabase();
