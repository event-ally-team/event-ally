const router = require('express').Router();
const { Events } = require('../../models');
const withAuth = require('../../utils/auth');




// The `/api/events` endpoint

router.post('/', async (req, res) => {
    try {
        const eventData = await Events.create(req.body);
        res.status(200).json(eventData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

router.delete('/:id', async (req, res) => {

    try {
        const eventData = await Events.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!eventData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;