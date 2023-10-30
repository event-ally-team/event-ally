const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found for this user!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!eventData[0]) {
      res.status(404).json({ message: 'The event was modified' });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!eventData[0]) {
      res.status(200).json({ message: 'The event was deleted!' });
      return;
    }
    res.status(404).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
