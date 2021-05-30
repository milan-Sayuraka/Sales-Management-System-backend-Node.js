const db = require("../models");
const Customers = db.customers;

exports.CustomersCreate = (req, res) => {
    const customers = new Customers({
        customerName: req.body.customerName,
        address: req.body.address,
        email: req.body.email,
        contact: req.body.contact
    });

    customers.save((err, customers) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        customers.save(err => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            res.send({ message: "Customer created successfully!" });
        });
    });
};

   // Retrieve and return all Customers from the database.
   exports.findAllCustomers = (req, res) => {
    Customers.find()
    .then(Customers => {
        res.send(Customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customers."
        });
    });
  };
  
// Find a single Customer with a CustomerId
exports.findOneCustomer = (req, res) => {
    Customers.findById(req.params.customersId)
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Customers not found with id " + req.params.customersId
            });            
        }
        res.send(customers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customers not found with id " + req.params.customersId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Customers with id " + req.params.customersId
        });
    });
};
  
  // Update a Customers by the Customers Id in the request
  exports.customersUpdate = (req, res) => {
    // Validate Request
    if(!req.body.collectionStatus || !req.body.customerId) {
        return res.status(400).send({
            message: "Customers collection Status or customerId can not be empty"
        });
    }
    // Find Customers and update it with the request body
    Customers.findByIdAndUpdate(req.params.customersId, {
        customerName: req.body.customerName,
        address: req.body.address,
        email: req.body.email,
        contact: req.body.contact
    }, {new: true})
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Customers not found with id " + req.params.customersId
            });
        }
        res.send(customers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customers not found with id " + req.params.customersId
            });                
        }
        return res.status(500).send({
            message: "Error updating Customers with id " + req.params.customersId
        });
    });
  };