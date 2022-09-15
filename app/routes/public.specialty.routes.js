const controller = require("../controllers/public.specialty.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Hiển thị danh sách tất cả các chuyên khoa
  //method: GET
  //URL:/api/specialties
  app.get("/api/public/specialties", controller.getAllSpecialties);

  //Hiển thị danh sách tất cả các chuyên khoa bởi id của phòng khám
  //method: GET
  //URL:/api/specialties
  app.get(
    "/api/public/specialties/:clinic_id",
    controller.getAllSpecialtiesByClinicId
  );
};
