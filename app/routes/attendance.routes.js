const controller = require("../controllers/attendance.controller");
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
    "/api/v1/attendance/create",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.attendanceCreate
  );

  app.get(
    "/api/v1/attendance/attendance-list",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.findAllAttendance
  );
  app.get(
    "/api/v1/attendance/attendance-findBy-date/:startDate/:endDate",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.findByDateRange
  );
  app.put(
    "/api/v1/attendance/attendance-update/:attendanceId",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.attendanceUpdate
  );
};

