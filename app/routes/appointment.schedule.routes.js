const { authJwt } = require("../middlewares");
const controller = require("../controllers/appointment.schedule.controller");

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    //   app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    //   );
    
    //   app.post(
    //     "/api/v1/appointment/scheduler",
    //     [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator, authJwt.isUser],
    //     controller.createAppointment
    //   );


}