const controller = require("../controllers/billing.controller");
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
    "/api/v1/billing/create",
    [
        authJwt.verifyToken
    ],
    controller.BillingCreate
  );
  app.get(
    "/api/v1/billing/billing-list",
    [
      authJwt.verifyToken
    ],
    controller.findAllBilling
  );
  app.get(
    "/api/v1/billing/billing-findBy-date/:startDate/:endDate",
    [
      authJwt.verifyToken
    ],
    controller.findByDateRange
  );
  app.put(
    "/api/v1/billing/billing-update/:billingId",
    [
      authJwt.verifyToken
    ],
    controller.billingUpdate
  );
  app.put(
    "/api/v1/billing/product/create/:billingId",
    [
        authJwt.verifyToken
    ],
    controller.createProduct
  );
};

