const db = require("../models");
const Product = db.product;

exports.productCreate = (req, res) => {
    const product = new Product({
        supplierId: req.body.supplierId,
        supplierName: req.body.supplierName,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        actualPrice: req.body.actualPrice,
        sellingPrice: req.body.sellingPrice,
        commissionRate: req.body.commissionRate,
        weight: req.body.weight,
        quantity: req.body.quantity,
    });

    product.save((err, product) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        product.save(err => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            res.send({ message: "Product created successfully!" });
        });
    });
};

 // Retrieve and return all Product  from the database.
 exports.findAllProduct  = (req, res) => {
    Product.find()
    .then(Product => {
        res.send(Product);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Product."
        });
    });
  };
  
  exports.findByDateRange = (req, res) => {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
  
    Product.find({"createdAt":{$gte:new Date(startDate).setHours(00, 00, 00), $lt:new Date(endDate).setHours(23, 59, 59)}}).sort({ date_paid: 'asc'}) 
    .then(product => {
        if(!product.length) {
            return res.status(404).send({
                message: "Product recodes not found in " + req.params.startDate + ' - ' + req.params.endDate
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found " 
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Product recodes in " + req.params.startDate + ' - ' + req.params.endDate
        });
    });
  };
  
  // Update a Product by the Product Id in the request
  exports.productUpdate = (req, res) => {
    // Validate Request
    if(!req.body.collectionStatus || !req.body.customerId) {
        return res.status(400).send({
            message: "Product collection Status or customerId can not be empty"
        });
    }
    // Find Product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        supplierId: req.body.supplierId,
        supplierName: req.body.supplierName,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        actualPrice: req.body.actualPrice,
        sellingPrice: req.body.sellingPrice,
        commissionRate: req.body.commissionRate,
        weight: req.body.weight,
        quantity: req.body.quantity
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.customerId
            });
        }
        res.send(customerPurchaseOrder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Product with id " + req.params.customerId
        });
    });
  };