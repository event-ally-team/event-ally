const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('login');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('login');
});

router.get('/signUp', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
  } else {
    res.render('signUp');
  }
});

router.get('/logOut', (req, res) => {
  req.session.logged_in = false;
  res.redirect('login');
});

router.get('/newevent', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event, EventItem }],
    });

    const user = userData.get({ plain: true });

    res.render('newEvent', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/checklist/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event, EventItem }],
    });

    const user = userData.get({ plain: true });

    res.render('checklist', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
