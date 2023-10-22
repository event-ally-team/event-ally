const router = require('express').Router();
const {RSVPs} = require('../../models');
const withAuth = require('../../utils/auth');




// The `/api/RSVPs` endpoint

//Login route

router.post('/login', async (req, res) => {

try{
const RSVPData = await RSVPs.findOne({ where: { email: req.body.email } });

} catch (err) {
    res.status(400).json(err);
}

if (!RSVPData) {
    res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    return;



}});



router.post('/', async (req, res) => {

    try {
        const RSVPData = await RSVPs.create(req.body);
        res.status(200).json(RSVPData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);





router.delete('/:id', async (req, res) => {
    try {
        const RSVPData = await RSVPs.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!RSVPData) {
            res.status(404).json({ message: 'No RSVP found with this id!' });
            return;
        }
        res.status(200).json(RSVPData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/', async (req, res) => {
    try {
        const RSVPData = await RSVPs.findAll();
        res.status(200).json(RSVPData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/:id', async (req, res) => {

    try {
        const RSVPData = await RSVPs.findByPk(req.params.id);
        if (!RSVPData) {
            res.status(404).json({ message: 'No RSVP found with this id!' });
            return;
        }
        res.status(200).json(RSVPData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;