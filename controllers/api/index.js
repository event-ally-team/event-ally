const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const EventItem = require('./eventItemsRoutes');
const EventTypes = require('./eventTypeRoutes');
const Checklist = require('./checklistRoutes');




router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/eventItem', EventItem);
router.use('/eventType', EventTypes);
router.use('/checklist', Checklist);

module.exports = router;