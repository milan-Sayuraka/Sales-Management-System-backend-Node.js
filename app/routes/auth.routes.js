const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
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
    "/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkDuplicateSalesRepEmail,
      verifySignUp.checkRolesExisted,
      // authJwt.verifyToken, 
      // authJwt.isAdmin,
    ],
    controller.signup
  );

  app.post(
    "/api/v1/auth/SalesRep/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkDuplicateSalesRepEmail,
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.SalesRepSignup
  );

  app.post(
    "/api/v1/auth/admin/signup",
    [
      verifySignUp.checkDuplicateAdminEmail,
      authJwt.verifyToken, 
      authJwt.isAdmin
    ],
    controller.Adminsignup
  );
  app.put(
    "/api/v1/auth/updateUser/:userId",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.companyUserUpdate
  );
  app.get(
    "/api/v1/auth/companyFind/:userID",
    [
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    controller.companyUserfindById
  );
  app.post("/api/v1/auth/signin",  controller.signin);
  app.post("/api/v1/auth/admin/signin", controller.Adminsignin);
  // app.post("/api/v1/auth/logout", [authJwt.verifyToken],  controller.Logout);
};

