const db = require("../models");
const Supplier = db.supplier;


exports.supplierCreate = (req, res) => {

    const supplier = new Supplier({
      companyName: req.body.companyName,
      url: req.body.url,
      companyAddress: req.body.companyAddress,
      contactDetails : req.body.contactDetails,
      commissionRate : req.body.commissionRate,
    });
  
    supplier.save((err, supplier) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
   
      supplier.save(err => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        res.send({ message: "Supplier created successfully!" });
      });
    });
  };

  // Retrieve and return all Supplier  from the database.
 exports.findAllSupplier  = (req, res) => {
  Supplier.find()
  .then(supplier => {
      res.send(supplier);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Supplier."
      });
  });
};

// Find a single supplier with a supplierId
exports.findOneSupplier = (req, res) => {
  Supplier.findById(req.params.supplierId)
  .then(supplier => {
      if(!supplier) {
          return res.status(404).send({
              message: "Supplier not found with id " + req.params.supplierId
          });            
      }
      res.send(supplier);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Supplier not found with id " + req.params.supplierId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Supplier with id " + req.params.supplierId
      });
  });
};

// Update a Supplier by the Supplier Id in the request
exports.supplierUpdate = (req, res) => {
  // Validate Request
  if(!req.body.companyName || !req.body.commissionRate) {
      return res.status(400).send({
          message: "Supplier companyName or commission Rate can not be empty"
      });
  }
  // Find Supplier and update it with the request body
  Supplier.findByIdAndUpdate(req.params.supplierId, {
    companyName: req.body.companyName,
    url: req.body.url,
    companyAddress: req.body.companyAddress,
    // contactDetails : req.body.contactDetails,
    commissionRate : req.body.commissionRate,
  }, {new: true})
  .then(supplier => {
      if(!supplier) {
          return res.status(404).send({
              message: "Supplier not found with id " + req.params.supplierId
          });
      }
      res.send(supplier);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Supplier not found with id " + req.params.supplierId
          });                
      }
      return res.status(500).send({
          message: "Error updating Supplier with id " + req.params.supplierId
      });
  });
};

    // create contact Details
    exports.createContactDetails = (req, res) => {

      Supplier.updateOne(
          { _id: req.params.supplierId },
          { $push: { contactDetails: req.body.contactDetails } },
          function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send({ message: "contact Details created successfully!" });
            }
          }
        );
    };