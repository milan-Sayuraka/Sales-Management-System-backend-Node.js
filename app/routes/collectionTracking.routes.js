const controller = require("../controllers/collectionTracking.controller");
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
    "/api/v1/collectionTracking/create",
    [
        authJwt.verifyToken
    ],
    controller.CollectionTrackingCreate
  );
  app.get(
    "/api/v1/collectionTracking/collectionTracking-list",
    [
      authJwt.verifyToken
    ],
    controller.findAllCollectionTracking
  );
  app.get(
    "/api/v1/collectionTracking/collectionTracking-findBy-date/:startDate/:endDate",
    [
      authJwt.verifyToken
    ],
    controller.findByDateRange
  );
  app.put(
    "/api/v1/collectionTracking/collectionTracking-update/:collectionTrackingId",
    [
      authJwt.verifyToken
    ],
    controller.collectionTrackingUpdate
  );
  app.put(
    "/api/v1/collectionTracking/invoices/create/:collectionTrackingId",
    [
        authJwt.verifyToken
    ],
    controller.createInvoices
  );
};

