const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: false},
  map_src: {type: String, required: false},
  start_at: {type: Date, required: true},
  end_at: {type: Date, required: false},
  people: {type: Number, required: true},
  is_private: {type: Boolean, required: true},
  organizer_id: {type: String, required: true},
  user_ids: {type: Array, required: false},
},{
  timestamps: true,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
