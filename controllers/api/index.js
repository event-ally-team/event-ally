const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const EventItem = require('./eventItemsRoutes');
const eventTypes = require('./eventTypeRoutes');
const checklist = require('./checklistRoutes');



router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/eventItem', EventItem);
router.use('/eventType', eventTypes);
router.use('/checklist', checklist);

module.exports = router;