const mongoose = require('mongoose');

const BillingSchema = mongoose.Schema({
    customerId: { 
        type: String,
        required: 'Customer Id can\'t be empty',
      },
      customerName: { 
        type: String,
        required: 'Customer Name can\'t be empty',
    },
    customerEmail: {
        type: String,
        required: 'Customer Email can\'t be empty',
        match: [
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please add a valid email adress'
      ]
    },
    contact: { 
        type: String,
        required: 'contact can\'t be empty',
    },
    companyPhoneNumber: { 
        type: String,
        required: 'Company Phone Number can\'t be empty',
    },
    billingAddress: { 
        type: String,
        required: 'Billing Address can\'t be empty',
    },
    purchaseOrder: { 
        type: String,
        required: 'Purchase Order can\'t be empty',
    },
    invoiceNumber: { 
        type: String,
        required: 'Invoice Number can\'t be empty',
    },
    salesRepID: { 
        type: String,
        required: 'Sales Rep ID can\'t be empty',
    },
    salesRep: { 
        type: String,
        required: 'Sales Repcan\'t be empty',
    },
    product: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
            productQuantity: {
                type: Number,
                required: 'Product Quantity can\'t be empty',
            },
            productName: {
                type: String,
                required: 'Product Name can\'t be empty',
            },
            productPrice: {
                type: Number,
                required: 'Product Price can\'t be empty',
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            updatedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    discount: { 
        type: Number,
        required: 'Discount can\'t be empty',
    },
    total: { 
        type: Number,
        required: 'total can\'t be empty',
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

module.exports = mongoose.model('Billing', BillingSchema,'Billing' );