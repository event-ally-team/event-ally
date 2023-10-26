const router = require('express').Router();
const { EventType } = require('../../models');


router.get('/event/:id', async (req, res) => {
    try {

        const EventTypeData = await EventType.findByPk(req.params.id, {
            attributes: ['name', 'description', 'date', 'location'],
        });

        if (!EventTypeData) {
          
            return res.status(404).json({ message: 'No event type found with this ID!' });
        }

        return res.status(200).json(EventTypeData);
    } catch (err) {
      
        return res.status(500).json(err);
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


