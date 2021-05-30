const db = require("../models");
const Sales_Rep = db.sales_rep;
const User = db.user;


function userStatus(UserId,status){
    User.findByIdAndUpdate(UserId, {
      activeStatus: status
  }, {new: true})
  .then(user => {
    if (!user) {
      return NextDB(UserId);
      // return res.status(404).send({ message: "User Not found." });
  
    }
  }).catch(err => {
  }
  );
  
  function NextDB(id) {
    Sales_Rep.findByIdAndUpdate(id, {
      activeStatus: status
  }, {new: true})
  .then(sales_Rep => {
    if (!sales_Rep) {
      return res.status(404).send({ message: "User Not found." });
    }
  }).catch(err => {
  }
  );
  }
  }
  
  module.exports = {
    userStatus: userStatus,
  };