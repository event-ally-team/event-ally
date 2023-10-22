const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const commentRoutes = require('./commentRoutes');
const RSVPs = require('./RSVPRoutes');
const checklist = require('./checklistRoutes');
const { User, Event, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { sequelize } = require('../../models/User');


router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/comments', commentRoutes);
router.use('/RSVPs', RSVPs);
router.use('/checklist', checklist);


module.exports = router;