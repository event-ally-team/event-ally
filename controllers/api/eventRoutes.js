const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');

router.get ('/newEvent/:id'), async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);

      if (!eventData) {
       return res.status(404).json({ message: 'No event found with this id!' });
      }
      const event = eventData.get({ plain: true });
      res.render('newEvent', {
        event: event,
        logged_in: req.session.user_id ? true : false
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  };  

  router.get('/:id'), async (req, res) => {
    try {
      const eventDataID = await Event.findByPk(req.params.id, {
        include: 
          {
            model: Event,
           attributes: ['id', 'title', 'description', 'is_completed', 'event_id', 'user_id'],
          },
      });
      
    const event = eventDataID.get({ plain: true });
    if (!eventDataID) {
        return res.status(404).json({ message: 'No event found with this id!' });
      }

      const eventItem = eventItemData.toJSON();
      const loggedin = req.session.user_id ? true : false;
      res.render('newEvent', {
        ...eventItem,
        logged_in: loggedin
      });
      }
      catch (err) {
        res.status(500).json(err);
      }
    };

    router.post('/newEvent', async (req, res) => {
      try{
        const eventData = await Event.create({
        id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        user_id: req.session.user_id,

        });
        res.status(200).json(eventData);
      } catch (err) {
        res.status(400).json(err);
      }
    }
    );

    router.delete('/:id', withAuth, async (req, res) => {
      try {
        const eventData = await Event.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
        if (!eventData) {
          res.status(404).json({ message: 'No event found with this id!' });
          return;
        }
        res.status(200).json(eventData);
      } catch (err) {
        res.status(500).json(err);
      }
    });

  
module.exports = router;
  
