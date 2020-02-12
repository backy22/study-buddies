const router = require('express').Router();
const Group = require('../models/group.model');

router.route('/').get((req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const address = req.body.address;
  const start_at = Date.parse(req.body.start_at);
  const end_at = Date.parse(req.body.end_at);
  const people = Number(req.body.people);
  const is_private = req.body.is_private;
  const organizer_id = req.body.organizer_id;
  const user_ids = req.body.user_ids;

  const newGroup = new Group({
    title,
    description,
    address,
    start_at,
    end_at,
    people,
    is_private,
    organizer_id,
    user_ids
  });

  newGroup.save()
    .then(() => res.json('Group added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Group.findByIdAndDelete(req.params.id)
    .then(() => res.json('Group deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      group.title = req.body.title;
      group.description = req.body.description;
      group.address = req.bodntroduction;
      group.start_at = Date.parse(req.body.start_at);
      group.end_at = Date.parse(req.body.end_at);
      group.people = Number(req.body.people);
      group.is_private = req.body.is_private;
      group.organizer_id = req.body.organizer_id;
      group.user_ids = req.body.user_ids;
      group.save()
        .then(() => res.json('Group updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

