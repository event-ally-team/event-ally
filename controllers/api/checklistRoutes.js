const router = require('express').Router();
const { Checklist } = require('../../models');


router.get('/checklist', async (req, res) => {
    try{
        const ChecklistData = await Checklist.findAll({
            include: [
                {
                    model: Checklist,
                    attributes: ['checklist_id', 'event_id', 'title', 'description'],
                },
            ],
        });
      
        const checklist = ChecklistData.map((checklist) => checklist.get({ plain: true }));
        res.render('checklist', { checklist });
    } catch (err) {
        res.status(500).json(err);
    }
});
      
router.post('/checklist', async (req, res) => {

    try {
        const ChecklistData = await Checklist.create({
            checklist_id: req.body.checklist_id,
            event_id: req.body.event_id,
            title: req.body.title,
            description: req.body.description,
        });
        res.status(200).json(ChecklistData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', async (req, res) => {

    try {
        const ChecklistData = await Checklist.destroy({
            where: {
             checklist_id: req.params.id,
             event_id: req.params.id,
                title: req.params.title,
                description: req.params.description,
            },
        });
        if (!ChecklistData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(ChecklistData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
