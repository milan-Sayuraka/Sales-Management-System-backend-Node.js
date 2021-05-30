const mongoose = require('mongoose');

const User = mongoose.Schema({
  username: String,
  email: { 
    type: String,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email adress'
  ]
  },
  password: { 
    type: String,
    required: 'password can\'t be empty',
  },
  pageAccess: [{  type:String}],
  companies: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
      companyName:String,
      url:String,
      createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now()
  }
  }],

  authToken: String ,
  location: {
    latitude : Number,
    longitude: Number
},
accountStatus: Number,
activeStatus: Number,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
    
  }, {
    timestamps: true
});

module.exports = mongoose.model('Company_Users', User,'Company_Users' );