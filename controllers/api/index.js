const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const commentRoutes = require('./commentRoutes');
const RSVPs = require('./RSVPRoutes');
const checklist = require('./checklistRoutes');
const withAuth = require('../../utils/auth');



router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/comments', commentRoutes);
router.use('/RSVPs', RSVPs);
router.use('/checklist', checklist);


module.exports = router;