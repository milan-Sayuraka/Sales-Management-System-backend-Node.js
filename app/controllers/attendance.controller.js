const db = require("../models");
const Attendance = db.attendance;


exports.attendanceCreate = (req, res) => {

    const attendance = new Attendance({
      salesRepUsername: req.body.salesRepUsername,
      salesRepId: req.body.salesRepId,
      date : req.body.date,
      attendance: req.body.attendance,
    });
  
    attendance.save((err, attendance) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
   
      attendance.save(err => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        res.send({ message: "Attendance is recoded successfully!" });
      });
    });
  };

  // Retrieve and return all Attendance from the database.
exports.findAllAttendance = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  Attendance.find()
  .then(Attendances => {
      res.send(Attendances);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Attendance."
      });
  });
};

exports.findByDateRange = (req, res) => {
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;

  Attendance.find({"createdAt":{$gte:new Date(startDate).setHours(00, 00, 00), $lt:new Date(endDate).setHours(23, 59, 59)}}).sort({ date_paid: 'asc'}) 
  .then(attendance => {
      if(!attendance.length) {
          return res.status(404).send({
              message: "Attendance recodes not found in " + req.params.startDate + ' - ' + req.params.endDate
          });            
      }
      res.send(attendance);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Attendance not found " 
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Attendance recodes in " + req.params.startDate + ' - ' + req.params.endDate
      });
  });
};

// Update a Attendance by the Attendance Id in the request
exports.attendanceUpdate = (req, res) => {
  // Validate Request
  if(!req.body.salesRepId || !req.body.salesRepUsername) {
      return res.status(400).send({
          message: "Attendance salesRepId or username can not be empty"
      });
  }

  // Find Attendance and update it with the request body
  Attendance.findByIdAndUpdate(req.params.attendanceId, {
    salesRepUsername: req.body.salesRepUsername ,
    salesRepId: req.body.salesRepId,
    date: req.body.date || new Date(),
    attendance: req.body.attendance || 0
  }, {new: true})
  .then(attendance => {
      if(!attendance) {
          return res.status(404).send({
              message: "Attendance not found with id " + req.params.attendanceId
          });
      }
      res.send(attendance);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Attendance not found with id " + req.params.attendanceId
          });                
      }
      return res.status(500).send({
          message: "Error updating Attendance with id " + req.params.attendanceId
      });
  });
};