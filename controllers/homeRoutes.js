const router = require('express').Router();
const {User} = require('../models');
const withAuth = require('../utils/auth');

router.post('/signup',  async (req, res) => {

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/dashboard');
    });
  }
  catch (err) {
    res.status(400).json(err);
  }
}
);

router.get('/login', async (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/signIn');
    return;
  }
});

module.exports = router;