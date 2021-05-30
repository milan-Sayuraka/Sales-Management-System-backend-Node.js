const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
      customerName: { 
        type: String,
        required: 'Customer Name can\'t be empty',
    },
    address: { 
        type: String,
        required: 'Address can\'t be empty',
    },
    email: { 
        type: String,
        required: 'Email can\'t be empty',
    },
    contact: { 
        type: String,
        required: 'Contact Address can\'t be empty',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customers', CustomersSchema,'Customers' );