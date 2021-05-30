const mongoose = require('mongoose');

const Admin = mongoose.Schema({
    username: String,
    email: { 
      type: String,
      required: 'Email can\'t be empty',
      unique: true
    },
    password: { 
      type: String,
      required: 'password can\'t be empty',
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    
  }, {
    timestamps: true
});

module.exports = mongoose.model('Admin', Admin,'Admin' );