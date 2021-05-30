const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Sales_Rep = db.sales_rep
const Admin = db.admin

checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
};

checkDuplicateSalesRepEmail = (req, res, next) => {
    // Email
    Sales_Rep.findOne({
      email: req.body.email
    }).exec((err, sales_rep) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (sales_rep) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
};

checkDuplicateAdminEmail = (req, res, next) => {
  // Email
  Admin.findOne({
    email: req.body.email
  }).exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (admin) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateAdminEmail,
  checkDuplicateEmail,
  checkDuplicateSalesRepEmail,
  checkRolesExisted
};

module.exports = verifySignUp;