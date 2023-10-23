const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const eventItems = require('./eventItems');
const eventTypes = require('./eventTypeRoutes');
const checklist = require('./checklist');



router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/eventItems', eventItems);
router.use('/eventTypes', eventTypes);
router.use('/checklist', checklist);

module.exports = router;