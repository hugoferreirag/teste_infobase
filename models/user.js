const mongoose = require('mongoose');
require('../config/mongodb');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phones: {
    type: Array,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
}, { timestamps: true });
const user = mongoose.model('user', schema);

module.exports = user;
