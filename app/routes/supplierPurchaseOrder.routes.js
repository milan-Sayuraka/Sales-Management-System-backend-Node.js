const controller = require("../controllers/supplierPurchaseOrder.controller");
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
    "/api/v1/supplierPurchaseOrder/create",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.supplierPurchaseOrderCreate
  );
  app.get(
    "/api/v1/supplierPurchaseOrder/supplierPurchaseOrder-list",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findAllSupplierPurchaseOrder
  );
  app.get(
    "/api/v1/supplierPurchaseOrder/supplierPurchaseOrder-findBy-date/:startDate/:endDate",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findByDateRange
  );
  app.put(
    "/api/v1/supplierPurchaseOrder/supplierPurchaseOrder-update/:supplierPurchaseOrderId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.supplierPurchaseOrderUpdate
  );
};

