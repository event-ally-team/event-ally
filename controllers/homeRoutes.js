const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
try {
  const userData = await User.findAll({
    include: [
      {
        model: User,
        attributes: ['email'],
      },
    ],
});

const users = userData.map((project) => project.get({ plain: true }));

res.render('signIn', {
  users,
  logged_in: req.session.logged_in,
});
} catch (err) {
res.status(500).json(err);
}
});



router.get('/event', async (req, res) => {
  try{
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
  });

  const events = eventData.map((project) => project.get({ plain: true }));

  res.render('event', {
    ...events,
    logged_in: req.session.logged_in,
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
    logged_in: true
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/signIn', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signIn');
});

module.exports = router;
