const router = require('express').Router();
const {EventItem} = require('../../models');


router.post('/', async (req, res) => {
    
        try {
            const EventItemData = await EventItem.create({
                ...req.body,
                user_id: req.session.user_id,
            });
            res.status(200).json(EventItemData);
        } catch (err) {
            res.status(400).json(err);
        }
        }
    
);

router.get('/event/:id', async (req, res) => {

    try {
        const EventItemData = await EventItem.findByPk(req.params.id, {
            include: [
                {
                    model: EventItem,
                    attributes: ['name'],
                    attributes: ['description'],
                    attributes: ['date'],
                    attributes: ['location'],
                    attributes: ['completed'],
                },
            ],
        
        });
        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete('/:id', async (req, res) => {

    try {
        const EventItemData = await EventItem.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!EventItemsData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('eventItems', async (req, res) => {

    try {
        const EventItemData = await EventItem.findAll({
            where: {
                user_id: req.session.user_id,

            },
        });
        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('EventItems/:id', async (req, res) => {

    try {
        const EventItemData = await EventItem.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id,
            },
        });
        if (!EventItemData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;