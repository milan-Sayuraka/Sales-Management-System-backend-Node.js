const mongoose = require('mongoose');

const SupplierPurchaseOrderSchema = mongoose.Schema({
    supplierPurchaseOrderNumber: {
        type: String,
        required: 'Purchase Order Number can\'t be empty',
    },
    date: {
        type: Date,
        required: 'Date can\'t be empty',
    },
    billingAddress: {
        type: String,
        required: 'Billing Address can\'t be empty',
    },
    supplierName: {
        type: String,
        required: 'Supplier Name can\'t be empty',
    },
    supplierEmail: {
        type: String,
        required: 'Supplier Email can\'t be empty',
        match: [
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please add a valid email adress'
      ]
    },
    supplierAddress: {
        type: String,
        required: 'Supplier Address can\'t be empty',
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
    purchaseOrderTotal: {
        type: Number,
        required: 'Purchase Order Total can\'t be empty',
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

module.exports = mongoose.model('Supplier_Purchase_Order', SupplierPurchaseOrderSchema, 'Supplier_Purchase_Order');