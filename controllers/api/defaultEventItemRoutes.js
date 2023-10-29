const router = require('express').Router();
const { DefaultEventItem } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:type', withAuth, async (req, res) => {
  try {
    const defaultEventItemData = await DefaultEventItem.findAll({
      where: {
        type: req.params.type,
      },
    });

    if (!defaultEventItemData) {
      res
        .status(404)
        .json({ message: 'No default event item found for this event type!' });
      return;
    }

    res.status(200).json(defaultEventItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
