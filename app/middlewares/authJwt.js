const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Admin = db.admin;
const Sales_Rep = db.sales_rep;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    User.findById(req.userId)
    .then(user => {
        if(!user) {
          return CheckNextDB(req.userId);
        }
        if(user.authToken == token) {
          next();
         
        } else{
          return res.status(401).send({ message: "Sorry, your token expired!" });
        }
    
    }).catch(err => {
      return res.status(401).send({ message: "Sorry, your token expired!" });
    });
    function CheckNextDB(id) {
      Sales_Rep.findById(id)
      .then(Sales_Rep => {
        if(!Sales_Rep) {
          return res.status(401).send({ message: "Unauthorized!" });
        }
        if(Sales_Rep.authToken == token) {
          next();
         
        } else{
          return res.status(401).send({ message: "Sorry, your token expired!" });
        }
    
    }).catch(err => {
      return res.status(401).send({ message: "Sorry, your token expired!" });
    });
    }
    // next();
  });
};

isAdmin = (req, res, next) => {
  Admin.findById(req.userId).exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!admin) {
      return  res.status(403).send({ message: "Require Admin Role!" });
    }
    Role.find(
      {
        _id: { $in: admin.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
      if (err) {
        console.log('error out here')
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return SearchNext(req.userId);
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });

    
    function SearchNext(id) {
      Sales_Rep.findById(id).exec((err, Sales_Rep) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!Sales_Rep) {
          return res.status(403).send({ message: "Require moderator Role!" });
        }
        Role.find(
          {
            _id: { $in: Sales_Rep.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "moderator") {
                next();
                return;
              }
            }
    
            res.status(403).send({ message: "Require moderator Role!" });
            return;
          }
        );
      })
  }

};

isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return SearchNext2(req.userId);
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require user Role!" });
        return;
      }
    );
  });
  function SearchNext2(id) {
    Sales_Rep.findById(id).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(403).send({ message: "Require user Role!" });
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "user") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require user Role!" });
          return;
        }
      );
    })
}
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isUser
};
module.exports = authJwt;