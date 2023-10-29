const router = require('express').Router();
const { Event, User, EventItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signIn');
});

router.get('/signIn', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signIn');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signIn');
});

router.get('/logout', (req, res) => {
  res.render('signIn');
});

router.get('/signUp', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signUp');
});

router.get('/newevent', withAuth, async (req, res) => {
  if (req.session.logged_in) {
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
    return;
  }
  res.render('signIn');
});

router.get('/dashboard', withAuth, async (req, res) => {
  if (req.session.logged_in) {
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

    return;
  }
  res.render('signIn');
});

router.get('/checklist', withAuth, async (req, res) => {
  const selectedType = req.query.type;

  if (req.session.logged_in) {
    try {
      const checklistData = await DefaultEventItem.findAll({
        where: {
          type: selectedType,
        },
      });

      res.render('checklist', {
        checklistData,
        selectedType,
        logged_in: true,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.redirect('/signIn');
  }
});

module.exports = router;
