const mongoose = require('mongoose');

const User_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter full name'],
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      require: [true, 'Please enter password'],
    },
    gender: {
      type: String,
      require: true,
    },
    tell: {
      type: String,
    },
    city: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);
User_Schema.index({ location: '2dsphere' });

const User = mongoose.model('User', User_Schema);

module.exports = User;
