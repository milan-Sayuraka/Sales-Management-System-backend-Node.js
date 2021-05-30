const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({
    companyName: { 
        type: String,
        required: 'Company name can\'t be empty',
      },
      url: String,
      companyAddress: { 
        type: String,
        required: 'Company Address can\'t be empty',
    },
    contactDetails: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
          name:{ 
            type: String,
            required: 'Name can\'t be empty',
        },
        contactNo:{ 
            type: String,
            required: 'Contact no can\'t be empty',
        },  
        email: { 
            type: String,
            unique: true,
            match: [
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Please add a valid email adress'
          ]
          },
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
        required: 'Commission rate can\'t be empty',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', SupplierSchema,'Supplier' );