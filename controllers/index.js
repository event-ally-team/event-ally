const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const commentRoutes = require('./commentRoutes');
const RSVPs = require('./RSVPs');
const checklist = require('./checklist');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/comments', commentRoutes);
router.use('/RSVPs', RSVPs);
router.use('/checklist', checklist);




module.exports = router;

