const router = require('express').Router();
const { EventType } = require('../../models');

router.get('/event/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/newEvent');
        return;
    }
    try {
        res.render('/newEvent');
    }
    catch (err) {
        res.status(500).json(err);
    }
    try {
        const EventTypeData = await EventType.findByPk(req.params.id, {
            include: [
                {
                    model: EventType,
                    attributes: ['name'],
                    attributes: ['description'],
                    attributes: ['date'],
                    attributes: ['location'],
                },
            ],
        });
        if (!EventTypeData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const EventTypeData = await EventType.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(EventTypeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const EventTypeData = await EventType.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!EventTypeData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(EventTypeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


