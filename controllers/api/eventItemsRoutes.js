const router = require('express').Router();
const { EventItem } = require('../../models');

router.post('/eventItem', async (req, res) => {

    try {
        const EventItemData = await EventItem.create({
           id: req.body.id,
              title: req.body.title,
              description: req.body.description,
                is_completed: req.body.is_completed,
                event_id: req.body.event_id,
        });
        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(400).json(err);
    }
        return res.render('newEvent');
});

router.put('eventItem/:id', async (req, res) => {
    
        try {
            const EventItemData = await EventItem.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                    title: req.body.title,
                    type: req.body.type,
                    is_completed: req.body.is_completed,
                    event_id: req.body.event_id,

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

router.get('eventItem/:id', async (req, res) => {

    try { 
        const EventItemData = await EventItem.findByPk(req.params.id, {
            include: [
                {
                    model: EventItem,
                    attributes: ['title', 'type', 'start_date', 'end_date'],
                    
                },
            ],
        });
    
        if (!EventItemData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('eventItem/:id', async (req, res) => {

    try {
        const EventItemData = await EventItem.destroy({
            where: {
                id: req.params.id,
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
});

module.exports = router;
