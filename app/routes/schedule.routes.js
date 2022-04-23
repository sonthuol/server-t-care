const { authJwt } = require("../middleware");
const controller = require("../controllers/schedule.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Tạo một lịch khám
  //method: POST
  //Access: Doctor
  //URL:/api/schedules
  app.post(
    "/api/schedules",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.create
  );

  //Hiển thị lịch khám bới bác sĩ và ngày nào
  //method: POST
  //Access: Doctor
  //URL:/api/schedules
  app.get(
    "/api/schedules/:doctorId",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.showScheduleByDay
  );

  //Hiển thị lịch khám bới bác sĩ và ngày nào
  //method: POST
  //Access: Doctor
  //URL:/api/schedules
  app.get(
    "/api/schedules/getId/:doctorId",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.showScheduleByDayGetId
  );

  //Cập nhật lịch khám
  //method: PUT
  //Access: Doctor
  //URL:/api/schedules/:id
  app.put(
    "/api/schedules/:id",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.update
  );
};
