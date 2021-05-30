const config = require("../../config/auth.config");
const db = require("../models");
const Sales_Rep = db.sales_rep;
const User = db.user;
const Role = db.role;
const Admin = db.admin;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.Adminsignup = (req, res) => {

  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  admin.save((err, admin) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          admin.roles = roles.map(role => role._id);
          admin.save(err => {
            if (err) {
              res.status(500).send({ message: err.message });
              return;
            }

            res.send({ message: "admin was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        admin.roles = [role._id];
        admin.save(err => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          res.send({ message: "admin was registered successfully!" });
        });
      });
    }
  });
};

exports.signup = (req, res) => {

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    pageAccess: req.body.pageAccess,
    companies: req.body.companies,
    authToken: req.body.authToken,
    location: req.body.location,
    accountStatus: 1,
    activeStatus: 0,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err.message });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};


exports.SalesRepSignup = (req, res) => {

  const sales_rep = new Sales_Rep({
    username: req.body.username,
    email: req.body.email,
    companies: req.body.companies,
    commissionRate: req.body.commissionRate,
    authToken: req.body.authToken,
    location: req.body.location,
    accountStatus: 1,
    activeStatus: 0,
    pageAccess: req.body.pageAccess,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  sales_rep.save((err, sales_rep) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          sales_rep.roles = roles.map(role => role._id);
          sales_rep.save(err => {
            if (err) {
              res.status(500).send({ message: err.message });
              return;
            }

            res.send({ message: "sales rep User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        sales_rep.roles = [role._id];
        sales_rep.save(err => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          res.send({ message: "sales rep User was registered successfully!" });
        });
      });
    }

  });
};


exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      if (!user) {
        // return validate(req, res);
        return res.status(404).send(
          {
            message: "User Not found."
          }
        );

      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }


      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      //token save
      User.findByIdAndUpdate(user.id, {
        authToken: token
      }, { new: true })
        .then(user => {
        }).catch(err => {
        }
        );
      //token save

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          companies: user.companies,
          roles: authorities,
          pageAccess: user.pageAccess,
          accessToken: token,
      });
    });

  function validate(req, res) {
    Sales_Rep.findOne({
      email: req.body.email
    })
      .populate("roles", "-__v")
      .exec((err, sales_rep) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        if (!sales_rep) {
          return res.status(404).send({ message: "sales rep User Not found." });

        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          sales_rep.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ id: sales_rep.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        //token save
        Sales_Rep.findByIdAndUpdate(sales_rep.id, {
          authToken: token
        }, { new: true })
          .then(user => {
          }).catch(err => {
          }
          );
        //token save
        var authorities = [];

        for (let i = 0; i < sales_rep.roles.length; i++) {
          authorities.push("ROLE_" + sales_rep.roles[i].name.toUpperCase());
        }

        res.status(200).send({
          username: sales_rep.username,
          email: sales_rep.email,
          companies: sales_rep.companies,
          commissionRate: sales_rep.commissionRate,
          location: sales_rep.location,
          roles: authorities,
          pageAccess: sales_rep.pageAccess,
          accessToken: token,
        });
      });
    // ...
  }

};

exports.Adminsignin = (req, res) => {
  Admin.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "Admin Not found." });

      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }


      var token = jwt.sign({ id: admin.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < admin.roles.length; i++) {
        authorities.push("ROLE_" + admin.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        roles: authorities,
        accessToken: token,
      });
    });


};

// Update a User by the User Id in the request
exports.companyUserUpdate = (req, res) => {
  // Validate Request
  if (!req.body.username || !req.body.email) {
    return res.status(400).send({
      message: "User Id or username can not be empty"
    });
  }
  // Find User and update it with the request body
  User.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    email: req.body.email,
    companies: req.body.companies
  }, { new: true, useFindAndModify: false })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send({success: true});
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.userId
      });
    });
};

// Find a single supplier with a supplierId
exports.companyUserfindById = (req, res) => {
  console.log(req)
  User.findById(req.params.userID)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userID
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userID
          });                
      }
      return res.status(500).send({
          message: "Error retrieving User with id " + req.params.userID
      });
  });
};


