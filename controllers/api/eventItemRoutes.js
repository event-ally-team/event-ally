const router = require('express').Router();
const { EventItem } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
  console.log('test', req.body);

  try {
    const newEventItem = await EventItem.create({
      ...req.body,
      event_id: parseInt(req.params.id),
      user_id: req.session.user_id,
    });

    res.status(200).json(newEventItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const eventItemData = await EventItem.findAll({
      where: {
        event_id: parseInt(req.params.id),
        user_id: req.session.user_id,
      },
    });

    if (!eventItemData) {
      res
        .status(404)
        .json({
          message: 'No event item found for this user with this event id!',
        });
      return;
    }

    res.status(200).json(eventItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const eventItemData = await EventItem.update(req.body, {
      where: {
        id: parseInt(req.params.id),
        user_id: req.session.user_id,
      },
    });
    if (!eventItemData[0]) {
      res.status(404).json({ message: 'No event item with this id!' });
      return;
    }
    res.status(200).json(eventItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventItemData = await EventItem.destroy({
      where: {
        id: parseInt(req.params.id),
        user_id: req.session.user_id,
      },
    });
    if (!eventItemData[0]) {
      res.status(404).json({ message: 'The event item was deleted!' });
      return;
    }
    res.status(200).json(eventItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
