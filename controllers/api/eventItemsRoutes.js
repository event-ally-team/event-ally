const router = require('express').Router();
const {EventItems} = require('./eventItems');

router.post('/', async (req, res) => {
    
        try {
            const EventItemsData = await EventItems.create({
                ...req.body,
                user_id: req.session.user_id,
            });
            res.status(200).json(EventItemsData);
        } catch (err) {
            res.status(400).json(err);
        }
        }
    
);

router.get('/event/:id', async (req, res) => {

    try {
        const eventItemsData = await EventItems.findByPk(req.params.id, {
            include: [
                {
                    model: EventItems,
                    attributes: ['name'],
                    attributes: ['description'],
                    attributes: ['date'],
                    attributes: ['location'],
                    attributes: ['completed'],
                },
            ],
        
        });
        res.status(200).json(eventItemsData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete('/:id', async (req, res) => {

    try {
        const EventItemsData = await EventItems.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!EventItemsData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(EventItemsData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('eventItems', async (req, res) => {

    try {
        const eventItemsData = await EventItems.findAll({
            where: {
                user_id: req.session.user_id,

            },
        });
        res.status(200).json(eventItemsData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('EventItems/:id', async (req, res) => {

    try {
        const eventItemsData = await EventItems.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id,
            },
        });
        if (!eventItemsData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(eventItemsData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;