const { authJwt } = require("../middleware");
const controller = require("../controllers/appointment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Hiển thị lịch hẹn bới bác sĩ và ngày nào
  //method: Get
  //Access: Doctor
  //URL:/api/appointment
  app.get(
    "/api/appointment/:doctorId",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.showAppointmentByDay
  );

  //Hiển thị chi tiết lịch khám
  //method: Get
  //Access: Doctor
  //URL: /api/appointment/details/:medicalRecordId
  app.get(
    "/api/appointment/details/:medicalRecordId",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.getMedicalRecordDetails
  );
};
