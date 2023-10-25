const router = require('express').Router();
const { EventItem } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {

    try {
        const EventItemData = await EventItem.create({
            ...req.body,
            user_id: req.session.user_id,
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            is_complete: req.body.is_complete,
            event_id: req.body.event_id,
        });
        res.status(200).json(EventItemData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.get('/EventItem/:id', withAuth, async (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/checklist');
        return;
    }
    try {
        res.render('/checklist');
    }
    catch (err) {
        res.status(500).json(err);
    }
    try {

        const EventItemData = await EventItem.findByPk(req.params.id, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
                event_id: req.body.event_id,
                title: req.body.title,
                description: req.body.description,
                is_complete: req.body.is_complete,
            },
        });

        res.status(200).json(EventItemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {

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
