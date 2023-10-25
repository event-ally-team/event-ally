const router = require('express').Router();
const {Event} = require('../../models');


router.post('/', async (req, res) => {

    try { const EventItemData = await Event.create({
        ...req.body,
        user_id: req.session.user_id,
        title: req.body.title,
        type: req.body.type, 
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        id: req.body.id,
    });

    res.status(200).json(EventItemData);
} catch (err) {
    res.status(400).json(err);

}
}
);

router.delete('/:id', async (req, res) => {

    try { 
          const EventItemData = await event.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
                title: req.body.title,
                type: req.body.type,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
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
  