const router = require('express').Router();
const {eventTypes} = require('./eventTypeRoutes');


router.post('/', async (req, res) => {

    try {
        const eventTypeData = await eventType.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(eventTypeData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

router.get('/event/:id', withAuth, async (req, res) => {
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
        res.status(200).json(eventTypeData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete('/:id', async (req, res) => {

    try {
        const eventTypeData = await eventType.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!eventTypeData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(eventTypeData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('eventType', async (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/eventType');
        return;
    }
    res.render('eventType');
}
);

module.exports = router;
