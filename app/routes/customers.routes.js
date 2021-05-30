const controller = require("../controllers/customers.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/customers/create",
    [
        authJwt.verifyToken
    ],
    controller.CustomersCreate
  );
  app.get(
    "/api/v1/customers/customers-list",
    [
      authJwt.verifyToken
    ],
    controller.findAllCustomers
  );
  app.get(
    "/api/v1/customers/customers-findBy-id/:customerPurchaseOrderId",
    [
      authJwt.verifyToken
    ],
    controller.findOneCustomer
  );
  app.put(
    "/api/v1/customerPurchaseOrder/customerPurchaseOrder-update/:customerPurchaseOrderId",
    [
      authJwt.verifyToken
    ],
    controller.customersUpdate
  );
};

