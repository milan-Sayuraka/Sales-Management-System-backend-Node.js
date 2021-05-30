const mongoose = require('mongoose');

const AppointmentSchedulerSchema = mongoose.Schema({
    salonId: { 
        type: String,
        required: 'Salon ID can\'t be empty',
        unique: true
      },
    salonName: { 
      type: String,
      required: 'Salon name can\'t be empty',
      unique: true
    },
    branchId: String,
    branchName: String,
    employeeName: String,
    employeeId: String,
    clientId: String,
    clientName: String,
    clientPhoneNumber: Number,
    service: [{ type:String}],
    startDateTime: Date,
    endDateTime: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment_Scheduler', AppointmentSchedulerSchema,'Appointment_Scheduler' );