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

router.get('/checklist/:id', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    try {
      const dbEventData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: EventItem,
            attributes: ['title', 'description', 'completed'],
          },
        ],
      });

      const checklist = dbEventData.get({ plain: true });
      // Send over the 'loggedIn' session variable to the 'gallery' template
      res.render('checklist', { checklist, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    return;
  }
  res.render('signIn');
});

module.exports = router;
