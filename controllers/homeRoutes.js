const router = require('express').Router();
const { Event, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/signin');
    return;
  }
  res.render('login');
}
);

router.get('/' , async (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/dashboard');
  
  }
});