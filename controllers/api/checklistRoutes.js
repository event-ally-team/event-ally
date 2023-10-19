const router = require('express').Router();
const {Checklist} = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/checklist` endpoint

router.post('/', async (req, res) => {
    try {
        const checklistData = await Checklist.create(req.body);
        res.status(200).json(checklistData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

router.delete('/:id', async (req, res) => {

    try {
        const checklistData = await Checklist.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!checklistData) {
            res.status(404).json({ message: 'No checklist found with this id!' });
            return;
        }
        res.status(200).json(checklistData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;