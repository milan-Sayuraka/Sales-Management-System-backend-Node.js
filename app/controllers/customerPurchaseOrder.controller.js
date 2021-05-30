const db = require("../models");
const CustomerPurchaseOrder = db.customerPurchaseOrder;


exports.customerPurchaseOrderCreate = (req, res) => {

    const customerPurchaseOrder = new CustomerPurchaseOrder({
      purchaseOrderNumber: req.body.purchaseOrderNumber,
      date: req.body.date,
      customerName : req.body.customerName,
      customerEmail : req.body.customerEmail,
      billingAddress: req.body.billingAddress,
      productId : req.body.productId,
      productName : req.body.productName,
      productQuantity : req.body.productQuantity,
      productPrice : req.body.productPrice,
      total : req.body.total,
    });
  
    customerPurchaseOrder.save((err, customerPurchaseOrder) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
   
      customerPurchaseOrder.save(err => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        res.send({ message: "Customer Purchase Order created successfully!" });
      });
    });
  };

   // Retrieve and return all CustomerPurchaseOrder from the database.
 exports.findAllCustomerPurchaseOrder = (req, res) => {
  CustomerPurchaseOrder.find()
  .then(CustomerPurchaseOrder => {
      res.send(CustomerPurchaseOrder);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving CustomerPurchaseOrder."
      });
  });
};

exports.findByDateRange = (req, res) => {
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;

  CustomerPurchaseOrder.find({"createdAt":{$gte:new Date(startDate).setHours(00, 00, 00), $lt:new Date(endDate).setHours(23, 59, 59)}}).sort({ date_paid: 'asc'}) 
  .then(customerPurchaseOrder => {
      if(!customerPurchaseOrder.length) {
          return res.status(404).send({
              message: "CustomerPurchaseOrder recodes not found in " + req.params.startDate + ' - ' + req.params.endDate
          });            
      }
      res.send(customerPurchaseOrder);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "CustomerPurchaseOrder not found " 
          });                
      }
      return res.status(500).send({
          message: "Error retrieving CustomerPurchaseOrder recodes in " + req.params.startDate + ' - ' + req.params.endDate
      });
  });
};

// Update a CustomerPurchaseOrder by the CustomerPurchaseOrder Id in the request
exports.customerPurchaseOrderUpdate = (req, res) => {
  // Validate Request
  if(!req.body.collectionStatus || !req.body.customerId) {
      return res.status(400).send({
          message: "CustomerPurchaseOrder collection Status or customerId can not be empty"
      });
  }
  // Find CustomerPurchaseOrder and update it with the request body
  CustomerPurchaseOrder.findByIdAndUpdate(req.params.customerPurchaseOrderId, {
    purchaseOrderNumber: req.body.purchaseOrderNumber,
    date: req.body.date,
    customerName : req.body.customerName,
    customerEmail : req.body.customerEmail,
    billingAddress: req.body.billingAddress,
    productId : req.body.productId,
    productName : req.body.productName,
    productQuantity : req.body.productQuantity,
    productPrice : req.body.productPrice,
    total : req.body.total,
  }, {new: true})
  .then(customerPurchaseOrder => {
      if(!customerPurchaseOrder) {
          return res.status(404).send({
              message: "CustomerPurchaseOrder not found with id " + req.params.customerPurchaseOrderId
          });
      }
      res.send(customerPurchaseOrder);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "CustomerPurchaseOrder not found with id " + req.params.customerPurchaseOrderId
          });                
      }
      return res.status(500).send({
          message: "Error updating CustomerPurchaseOrder with id " + req.params.customerPurchaseOrderId
      });
  });
};