const { authJwt } = require("../middleware");
const controller = require("../controllers/public.doctor.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  //Hiển thị danh sách tất cả các bác sĩ
  //method: GET
  //Access: Root, Admin
  //URL:/api/doctor
  app.get("/api/public/doctors", controller.getAllDoctors);

  //Hiển thị danh sách tất cả các bác sĩ bởi phòng khám và chuyên khoa
  //method: GET
  //Access: Root, Admin
  //URL:/api/doctor
  app.get(
    "/api/public/doctors/:clinic_id/:specialty_id",
    controller.getAllDoctorsByClinicIdAndSpecialtyId
  );
};
