const mongoose = require('mongoose');

const SalesRepSchema = mongoose.Schema({
    username: { 
      type: String,
      required: 'User name can\'t be empty',
    },
    email: { 
        type: String,
        unique: true,
        match: [
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please add a valid email adress'
      ]
      },
      companies: [
        {
          companyId: String,
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
    commissionRate: { 
      type: Number,
      required: 'Commission rate can\'t be empty'
    },
    authToken: String ,
    pageAccess: [{  type:String}],
    password: { 
        type: String,
        required: 'Password can\'t be empty',
      },
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

module.exports = mongoose.model('Sales_Rep', SalesRepSchema,'Sales_Rep' );