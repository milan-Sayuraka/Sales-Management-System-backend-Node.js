const controller = require("../controllers/supplier.controller");
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
    "/api/v1/supplier/create",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.supplierCreate
  );
  app.get(
    "/api/v1/supplier/supplier-list",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findAllSupplier
  );
  app.get(
    "/api/v1/supplier/supplier-findBy-id/:supplierId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.findOneSupplier
  );
  app.put(
    "/api/v1/supplier/supplier-update/:supplierId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.supplierUpdate
  );
  app.put(
    "/api/v1/supplier/contactDetails/create/:supplierId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.createContactDetails
  );
};

