const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const eventItem = require('./eventItemRoutes');
const defaultEventItem = require('./defaultEventItemRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/eventItems', eventItem);
router.use('/defaultEventItems', defaultEventItem);

module.exports = router;
