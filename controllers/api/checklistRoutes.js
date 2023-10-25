const router = require('express').Router();
const { EventItem } = require('../../models');


router.get('/', async (req, res) => {
    try{
        const EventItemData = await EventItem.findAll({
            include: [
                {
                    model: EventItem,
                    attributes: ['EventItem'],
                },
                
            ],
    });

    const eventItems = EventItemData.map((project) => project.get({ plain: true }));

    res.render('/checklist', {
        ...eventItems,
        logged_in: req.session.logged_in,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

   


router.post('/', async (req, res) => {

    try {
        const EventItemData = await EventItem.create({
            ...req.body,
             checklist_id: req.session.checklist_id,
            event_id: req.session.event_id,
            title: req.session.title,
            description: req.session.description,
        });
        res.status(200).json(EventItemData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', async (req, res) => {

    try {
        const EventItemData = await EventItem.destroy({
            where: {
             checklist_id: req.params.id,
             event_id: req.params.id,
                title: req.params.title,
                description: req.params.description,
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
