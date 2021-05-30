const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    supplierId: {
        type: String,
        required: 'Supplier Id can\'t be empty',
    },
    supplierName: {
        type: String,
        required: 'Supplier Name can\'t be empty',
    },
    productName: {
        type: String,
        required: 'Product Name can\'t be empty',
    },
    productDescription: {
        type: String,
        required: 'Product Description can\'t be empty',
    },
    actualPrice: {
        type: Number,
        required: 'Actual Price can\'t be empty',
    },
    sellingPrice: {
        type: Number,
        required: 'Selling Price can\'t be empty',
    },
    commissionRate: {
        type: Number,
        required: 'Commission Rate can\'t be empty',
    },
    weight: {
        type: String,
        required: 'Weight can\'t be empty',
    },
    quantity: {
        type: Number,
        required: 'Quantity can\'t be empty',
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

module.exports = mongoose.model('Product', ProductSchema, 'Product');