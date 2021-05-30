const db = require("../models");
const SupplierPurchaseOrder = db.supplierPurchaseOrder;


exports.supplierPurchaseOrderCreate = (req, res) => {

    const supplierPurchaseOrder = new SupplierPurchaseOrder({
      supplierPurchaseOrderNumber: req.body.supplierPurchaseOrderNumber,
      date: req.body.date,
      billingAddress: req.body.billingAddress,
      supplierName : req.body.supplierName,
      supplierEmail : req.body.supplierEmail,
      supplierAddress : req.body.supplierAddress,
      productId : req.body.productId,
      productName : req.body.productName,
      productQuantity : req.body.productQuantity,
      productPrice : req.body.productPrice,
      total : req.body.total,
      purchaseOrderTotal: req.body.purchaseOrderTotal,
    });
  
    supplierPurchaseOrder.save((err, supplierPurchaseOrder) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
   
      supplierPurchaseOrder.save(err => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        res.send({ message: "Supplier Purchase Order created successfully!" });
      });
    });
  };
 // Retrieve and return all Supplier Purchase Order  from the database.
 exports.findAllSupplierPurchaseOrder  = (req, res) => {
  SupplierPurchaseOrder.find()
  .then(supplierPurchaseOrder => {
      res.send(supplierPurchaseOrder);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Supplier Purchase Order."
      });
  });
};

exports.findByDateRange = (req, res) => {
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;

  SupplierPurchaseOrder.find({"createdAt":{$gte:new Date(startDate).setHours(00, 00, 00), $lt:new Date(endDate).setHours(23, 59, 59)}}).sort({ date_paid: 'asc'}) 
  .then(supplierPurchaseOrder => {
      if(!supplierPurchaseOrder.length) {
          return res.status(404).send({
              message: "Supplier Purchase Order recodes not found in " + req.params.startDate + ' - ' + req.params.endDate
          });            
      }
      res.send(supplierPurchaseOrder);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Supplier Purchase Order not found " 
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Supplier Purchase Order recodes in " + req.params.startDate + ' - ' + req.params.endDate
      });
  });
};

// Update a Supplier Purchase Order by the Supplier Purchase Order Id in the request
exports.supplierPurchaseOrderUpdate = (req, res) => {
  // Validate Request
  if(!req.body.purchaseOrderNumber || !req.body.supplierName) {
      return res.status(400).send({
          message: "Supplier Purchase Order collection Status or supplier Name can not be empty"
      });
  }
  // Find Supplier Purchase Order and update it with the request body
  SupplierPurchaseOrder.findByIdAndUpdate(req.params.supplierPurchaseOrderId, {
    supplierPurchaseOrderNumber: req.body.supplierPurchaseOrderNumber,
    date: req.body.date,
    billingAddress: req.body.billingAddress,
    supplierName : req.body.supplierName,
    supplierEmail : req.body.supplierEmail,
    supplierAddress : req.body.supplierAddress,
    productId : req.body.productId,
    productName : req.body.productName,
    productQuantity : req.body.productQuantity,
    productPrice : req.body.productPrice,
    total : req.body.total,
    purchaseOrderTotal: req.body.purchaseOrderTotal
  }, {new: true})
  .then(supplierPurchaseOrder => {
      if(!supplierPurchaseOrder) {
          return res.status(404).send({
              message: "Supplier Purchase Order not found with id " + req.params.supplierPurchaseOrderId
          });
      }
      res.send(supplierPurchaseOrder);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Supplier Purchase Order not found with id " + req.params.supplierPurchaseOrderId
          });                
      }
      return res.status(500).send({
          message: "Error updating Supplier Purchase Order with id " + req.params.supplierPurchaseOrderId
      });
  });
};