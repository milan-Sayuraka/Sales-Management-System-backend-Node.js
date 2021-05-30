const mongoose = require('mongoose');

const CustomerPurchaseOrderSchema = mongoose.Schema({
    purchaseOrderNumber: {
        type: String,
        required: 'Purchase Order Number can\'t be empty',
    },
    date: {
        type: Date,
        required: 'Date can\'t be empty',
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
    billingAddress: {
        type: String,
        required: 'Billing Address can\'t be empty',
    },
    productId: {
        type: String,
        required: 'Product ID can\'t be empty',
    },
    productName: {
        type: String,
        required: 'Product Name can\'t be empty',
    },
    productQuantity: {
        type: Number,
        required: 'Product Quantity can\'t be empty',
    },
    productPrice: {
        type: Number,
        required: 'Product Price can\'t be empty',
    },
    total: {
        type: Number,
        required: 'Product Price can\'t be empty',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer_Purchase_Order', CustomerPurchaseOrderSchema, 'Customer_Purchase_Order');