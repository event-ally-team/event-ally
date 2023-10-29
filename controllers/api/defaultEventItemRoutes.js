const router = require('express').Router();
const { DefaultEventItem } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const defaultEventItemData = await DefaultEventItem.findByPk(
      req.params.id,
      {
        attributes: ['id', 'title', 'description'],
      }
    );

    if (!defaultEventItemData) {
      res
        .status(404)
        .json({ message: 'Default event item not found for the specified ID' });
      return;
    }

    res.status(200).json(defaultEventItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new checklist item
router.post('/', withAuth, async (req, res) => {
  try {
    const newItem = await ChecklistItem.create({
      title: req.body.title,
      description: req.body.description,
      completed: false,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a checklist item by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const checklistItemData = await ChecklistItem.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!checklistItemData) {
      res
        .status(404)
        .json({ message: 'Checklist item not found for the specified ID' });
      return;
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
