const db = require("../models");
const CollectionTracking = db.collectionTracking;

exports.CollectionTrackingCreate = (req, res) => {
    const collectionTracking = new CollectionTracking({
        collectionStatus: req.body.collectionStatus,
        paymentStatus: req.body.paymentStatus,
        customerId: req.body.customerId,
        invoices: req.body.invoices,
        amount: req.body.amount,
        balance: req.body.balance,
        chequeNumber: req.body.chequeNumber,
        receivedDate: req.body.receivedDate,
    });

    collectionTracking.save((err, collectionTracking) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        collectionTracking.save(err => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            res.send({ message: "Collection Tracking created successfully!" });
        });
    });
};

 // Retrieve and return all CollectionTracking from the database.
 exports.findAllCollectionTracking = (req, res) => {
    CollectionTracking.find()
    .then(CollectionTracking => {
        res.send(CollectionTracking);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving CollectionTracking."
        });
    });
  };
  
  exports.findByDateRange = (req, res) => {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
  
    CollectionTracking.find({"createdAt":{$gte:new Date(startDate).setHours(00, 00, 00), $lt:new Date(endDate).setHours(23, 59, 59)}}).sort({ date_paid: 'asc'}) 
    .then(collectionTracking => {
        if(!collectionTracking.length) {
            return res.status(404).send({
                message: "CollectionTracking recodes not found in " + req.params.startDate + ' - ' + req.params.endDate
            });            
        }
        res.send(collectionTracking);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "CollectionTracking not found " 
            });                
        }
        return res.status(500).send({
            message: "Error retrieving CollectionTracking recodes in " + req.params.startDate + ' - ' + req.params.endDate
        });
    });
  };
  
  // Update a CollectionTracking by the CollectionTracking Id in the request
  exports.collectionTrackingUpdate = (req, res) => {
    // Validate Request
    if(!req.body.collectionStatus || !req.body.customerId) {
        return res.status(400).send({
            message: "CollectionTracking collection Status or customerId can not be empty"
        });
    }
    // Find CollectionTracking and update it with the request body
    CollectionTracking.findByIdAndUpdate(req.params.collectionTrackingId, {
        collectionStatus: req.body.collectionStatus,
        paymentStatus: req.body.paymentStatus,
        customerId: req.body.customerId,
        // invoices: req.body.invoices,
        amount: req.body.amount,
        balance: req.body.balance,
        chequeNumber: req.body.chequeNumber,
        receivedDate: req.body.receivedDate,
    }, {new: true})
    .then(collectionTracking => {
        if(!collectionTracking) {
            return res.status(404).send({
                message: "CollectionTracking not found with id " + req.params.collectionTrackingId
            });
        }
        res.send(collectionTracking);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "CollectionTracking not found with id " + req.params.collectionTrackingId
            });                
        }
        return res.status(500).send({
            message: "Error updating CollectionTracking with id " + req.params.collectionTrackingId
        });
    });
  };

    // create invoices
  exports.createInvoices = (req, res) => {

    CollectionTracking.updateOne(
        { _id: req.params.collectionTrackingId },
        { $push: { invoices: req.body.invoices } },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "invoices created successfully!" });
          }
        }
      );
  };