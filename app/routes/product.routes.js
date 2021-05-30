const controller = require("../controllers/product.controller");
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
    "/api/v1/product/create",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.productCreate
  );
  app.get(
    "/api/v1/product/product-list",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findAllProduct
  );
  app.get(
    "/api/v1/product/product-findBy-date/:startDate/:endDate",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findByDateRange
  );
  app.put(
    "/api/v1/product/product-update/:customerId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.productUpdate
  );
};

