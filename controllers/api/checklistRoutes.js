const router = require('express').Router();
const {Checklist} = require('../../models');
const withAuth = require('../../utils/auth');



// The `/api/checklist` endpoint
router.post('/', async (req, res) => {
    try {
        const checklistData = await Checklist.create({
            ...req.body,
            user_id: req.session.user_id,
        
        });
        res.status(200).json(checklistData);
    } catch (err) {
        res.status(400).json(err);

    }
    }
);

router.delete('/:id', async (req, res) => {

    try {
        const checklistData = await Checklist.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!checklistData) {
            res.status(404).json({ message: 'No checklist found with this id!' });
            return;
        }
        res.status(200).json(checklistData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/checklist/:id', async (req, res) => {
    try {
        const checklistData = await Checklist.findAll(req.params.id, {
            include: [
                {
                    model: Checklist,
                    attributes: ['name'],
                    attributes: ['description'],
                    attributes: ['date'],
                    attributes: ['completed'],
                },
            ],
        
        });
        res.status(200).json(checklistData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('dashboard', withAuth, async (req, res) => {

    try {
        const checklistData = await Checklist.findAll({
            where: {
                user_id: req.session.user_id,

            },
        });
        const checklist = checklistData.map((checklist) => checklist.get({ plain: true }));
        res.render('dashboard', {
            checklist,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;