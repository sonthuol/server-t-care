const { authJwt } = require("../middleware");
const controller = require("../controllers/doctor.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Hiển thị danh sách tất cả các bác sĩ
  //method: GET
  //Access: Root, Admin
  //URL:/api/doctor
  app.get(
    "/api/doctors",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllDoctors
  );

  //Tạo mới bác sĩ
  //method: POST
  //Access: Admin
  //URL:/api/doctors
  app.post(
    "/api/doctors",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  //Cập nhật trạng thái bác sĩ (Cập nhẩ giá trị isActive)
  //method: PATCH
  //Access: Admin
  //URL:/api/doctors/:id
  app.patch(
    "/api/doctors/changeStatus/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changeStatus
  );

  //Hiển thị bác sĩ theo id
  //method: GET
  //Access: Admin
  //URL:/api/doctors/:id
  app.get(
    "/api/doctors/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.details
  );

  //Cập nhật bác sĩ
  //method: PUT
  //Access: Admin
  //URL:/api/doctors/:id
  app.put(
    "/api/doctors/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  //Xoá chuyên khoa bác sĩ(Cập nhẩ giá trị isDelete)
  //method: PATCH
  //Access: Admin
  //URL:/api/doctors/:id
  app.patch(
    "/api/doctors/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
