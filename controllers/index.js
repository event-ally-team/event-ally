const router = require('express').Router();
const apiRoutes = require ('./api');
const signInRoutes = require ('./signInRoutes');

router.use('/', signInRoutes);
router.use('/api', apiRoutes);

module.exports = router;
