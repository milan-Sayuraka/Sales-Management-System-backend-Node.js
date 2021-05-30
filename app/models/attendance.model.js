const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    salesRepUsername: { 
        type: String,
        required: 'Sales Rep Username can\'t be empty',
      },
      salesRepId: { 
        type: String,
        required: 'User name can\'t be empty',
    },
    date: { 
        type: Date,
        required: 'User name can\'t be empty',
    },
    attendance: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', AttendanceSchema,'Attendance' );