const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: false},
  email: {type: String, required: true},
  password: {type: String, required: true},
  title: {type: String, required: false},
  area: {type: String, required: false},
  languages: {type: Array, required: false},
  age: {type: Number, required: false},
  introduction: {type: String, required: false},
  goal: {type: String, required: false},
  subjects: {type: Array, required: false}
},{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
