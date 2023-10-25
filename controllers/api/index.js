const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const EventItemRoutes = require('./eventItemsRoutes');


router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/eventItems', EventItemRoutes);


module.exports = router;