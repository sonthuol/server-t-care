const { authJwt } = require("../middleware");
const controller = require("../controllers/doctor.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Bác sĩ thuộc phòng khám
  //method: GET
  //Access: Admin
  //URL:/api/doctorBelongClinic/:id
  app.get(
    "/api/doctors/doctorBelongClinic/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.doctorBelongClinic
  );

  //Hiển thị danh sách tất cả các bác sĩ
  //method: GET
  //Access: Root, Admin
  //URL:/api/doctor
  app.get(
    "/api/doctors",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllDoctors
  );

  //Hiển thị danh sách bác sĩ cần khôi phục
  //Access: Root
  //URL:/api/doctors/restore
  app.get(
    "/api/doctors/restore",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.restoreList
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

  //Hiển thị bệnh nhân đặt lịch khám của bác sĩ
  //method: get
  //Access: doctor
  //URL:/api/doctors/getPatientByDoctorId:doctorId
  app.get(
    "/api/doctors/getPatientByDoctorId/:doctorId",
    // [authJwt.verifyToken, authJwt.isDoctor],
    controller.getAllPatientByDoctorId
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

  //Khôi phục bác sĩ
  //method: PATCH
  //Access: Admin
  //URL:/api/doctors/restore/:id
  app.patch(
    "/api/doctors/restore/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.restoreDoctor
  );

  //Xoá bác sĩ(Cập nhẩ giá trị isDelete)
  //method: PATCH
  //Access: Admin
  //URL:/api/doctors/:id
  app.patch(
    "/api/doctors/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
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

  //Xoá bác sĩ vĩnh viễn(Xoá khỏi mất từ CSDL)
  //method: DELETE
  //Access: Admin
  //URL:/api/doctors/restore/:id
  app.delete(
    "/api/doctors/restore/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteRestore
  );
};
