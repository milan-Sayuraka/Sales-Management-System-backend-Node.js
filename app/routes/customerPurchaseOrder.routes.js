const controller = require("../controllers/customerPurchaseOrder.controller");
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
    "/api/v1/customerPurchaseOrder/create",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.customerPurchaseOrderCreate
  );
  app.get(
    "/api/v1/customerPurchaseOrder/customerPurchaseOrder-list",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findAllCustomerPurchaseOrder
  );
  app.get(
    "/api/v1/customerPurchaseOrder/customerPurchaseOrder-findBy-date/:startDate/:endDate",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findByDateRange
  );
  app.put(
    "/api/v1/customerPurchaseOrder/customerPurchaseOrder-update/:customerPurchaseOrderId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.customerPurchaseOrderUpdate
  );
};

