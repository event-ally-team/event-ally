const router = require('express').Router();
const {Comments} = require('../../models');
const withAuth = require('../../utils/auth');



// The `/api/comments` endpoint

router.post('/', async (req, res) => {

    try {
        const commentData = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
        
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

router.get('/', async (req, res) => {
    try {
        const commentData = await Comments.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
        
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
