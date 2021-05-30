const db = require("../models");
// const User = db.user;
const Sales_Rep = db.sales_rep;
const User = db.user;
const Role = db.role;
const AppointmentScheduler = db.appointmentScheduler;

exports.allUsers = (req, res) => {
      User.find()
      .then(user => {
          res.send(user);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving Users."
          });
      });
  };

  exports.allSalesReps = (req, res) => {
    Sales_Rep.find()
    .then(sales_rep => {
        res.send(sales_rep);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sales rep."
        });
    });
};

exports.userRoleList = (req, res) => {
  Role.find()
  .then(role => {
      res.send(role);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving user role."
      });
  });
};
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


