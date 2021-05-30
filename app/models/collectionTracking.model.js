const mongoose = require('mongoose');

const CollectionTrackingSchema = mongoose.Schema({
    collectionStatus: {
        type: Number,
        required: 'Collection Status can\'t be empty',
    },
    paymentStatus: {
        type: Number,
        required: 'Payment Status can\'t be empty',
    },
    customerId: {
        type: String,
        required: 'Customer ID can\'t be empty',
    },
    invoices: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
            invoiceNumber: {
                type: String,
                required: 'Invoice Number can\'t be empty',
            },
            invoiceAmount: {
                type: Number,
                required: 'Invoice Amount can\'t be empty',
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    amount: {
        type: Number,
        required: 'Amount can\'t be empty',
    },
    balance: {
        type: Number,
        required: 'Balance can\'t be empty',
    },
    chequeNumber: {
        type: String,
        required: 'Cheque Number can\'t be empty',
    },
    receivedDate: {
        type: Date,
        required: 'Received Date can\'t be empty',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Collection_Tracking', CollectionTrackingSchema, 'Collection_Tracking');