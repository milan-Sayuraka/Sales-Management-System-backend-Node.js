const db = require("../models");
const Billing = db.billing;

exports.BillingCreate = (req, res) => {
    const billing = new Billing({
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        contact: req.body.contact,
        companyPhoneNumber: req.body.companyPhoneNumber,
        billingAddress: req.body.billingAddress,
        purchaseOrder: req.body.purchaseOrder,
        invoiceNumber: req.body.invoiceNumber,
        salesRepID: req.body.salesRepID,
        salesRep: req.body.salesRep,
        product: req.body.product,
        discount: req.body.discount,
        total: req.body.total,
    });

    billing.save((err, billing) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        billing.save(err => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            res.send({ message: "Bill created successfully!" });
        });
    });
};

  // Retrieve and return all Billing from the database.
  exports.findAllBilling = (req, res) => {
    Billing.find()
    .then(Billing => {
        res.send(Billing);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Billing."
        });
    });
  };
  
  exports.findByDateRange = (req, res) => {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
  
    Billing.find({"createdAt":{$gte:new Date(startDate).setHours(00, 00, 00), $lt:new Date(endDate).setHours(23, 59, 59)}}).sort({ date_paid: 'asc'}) 
    .then(billing => {
        if(!billing.length) {
            return res.status(404).send({
                message: "Billing recodes not found in " + req.params.startDate + ' - ' + req.params.endDate
            });            
        }
        res.send(billing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Billing not found " 
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Billing recodes in " + req.params.startDate + ' - ' + req.params.endDate
        });
    });
  };
  
  // Update a Billing by the Billing Id in the request
  exports.billingUpdate = (req, res) => {
    // Validate Request
    if(!req.body.customerId || !req.body.customerName) {
        return res.status(400).send({
            message: "Billing customerId or username can not be empty"
        });
    }
  
    // Find Billing and update it with the request body
    Billing.findByIdAndUpdate(req.params.billingId, {
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        contact: req.body.contact,
        companyPhoneNumber: req.body.companyPhoneNumber,
        billingAddress: req.body.billingAddress,
        purchaseOrder: req.body.purchaseOrder,
        invoiceNumber: req.body.invoiceNumber,
        salesRepID: req.body.salesRepID,
        salesRep: req.body.salesRep,
        // product: req.body.product,
        discount: req.body.discount,
        total: req.body.total,
    }, {new: true})
    .then(billing => {
        if(!billing) {
            return res.status(404).send({
                message: "Billing not found with id " + req.params.billingId
            });
        }
        res.send(billing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Billing not found with id " + req.params.billingId
            });                
        }
        return res.status(500).send({
            message: "Error updating Billing with id " + req.params.billingId
        });
    });
  };

    // create product
  exports.createProduct = (req, res) => {

    Billing.updateOne(
        { _id: req.params.billingId },
        { $push: { product: req.body.product } },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "product created successfully!" });
          }
        }
      );
  };