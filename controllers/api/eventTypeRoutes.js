const router = require('express').Router();
const {EventType} = require('./eventTypeRoutes');


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
    }
);

router.get('/event/:id', async (req, res) => {
    try {
        const eventTypeData = await eventType.findByPk(req.params.id, {
            include: [
                {
                    model: eventType,
                    attributes: ['name'],
                    attributes: ['description'],
                    attributes: ['date'],
                    attributes: ['location'],
                    attributes: ['completed'],
                },
            ],
        
        });
        res.status(200).json(EventTypeData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete('/:id', async (req, res) => {

    try {
        const EventTypeData = await EventType.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!eventTypeData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(EventTypeData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('EventType', async (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/eventType');
        return;
    }
    res.render('eventType');
}
);

module.exports = router;
