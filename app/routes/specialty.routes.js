const { authJwt } = require("../middleware");
const controller = require("../controllers/specialty.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Hiển thị danh sách tất cả các chuyên khoa
  //method: GET
  //Access: Root, Admin
  //URL:/api/specialties
  app.get(
    "/api/specialties",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllSpecialties
  );

  //Hiển thị danh sách chuyên khoa cần khôi phục(Xoá khỏi mất từ CSDL)
  //method: GET
  //Access: Root
  //URL:/api/specialties/restore
  app.get(
    "/api/specialties/restore",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.restoreList
  );

  //Tạo một chuyên khoa
  //method: POST
  //Access: Admin
  //URL:/api/specialties
  app.post(
    "/api/specialties",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  //Cập nhật trạngt thái chuyên khoa (Cập nhẩ giá trị status)
  //method: PATCH
  //Access: Root
  //URL:/api/specialties/:id
  app.patch(
    "/api/specialties/changeStatus/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changeStatus
  );

  //Hiển thị chuyên khoa theo id
  //method: GET
  //Access: Admin
  //URL:/api/specialties/:id
  app.get(
    "/api/specialties/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.details
  );

  //Cập nhật chuyên khoa
  //method: PUT
  //Access: Admin
  //URL:/api/specialties/:id
  app.put(
    "/api/specialties/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  //Khôi phục chuyên khoa phòng khám
  //method: PATCH
  //Access: Admin
  //URL:/api/specialties/restore/:id
  app.patch(
    "/api/specialties/restore/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.restoreSpecialty
  );

  //Xoá chuyên khoa phòng khám (Cập nhẩ giá trị isDelete)
  //method: PATCH
  //Access: Admin
  //URL:/api/specialties/:id
  app.patch(
    "/api/specialties/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );

  //Xoá chuyên khoa phòng khám vĩnh viễn(Xoá khỏi mất từ CSDL)
  //method: DELETE
  //Access: Admin
  //URL:/api/specialties/restore/:id
  app.delete(
    "/api/specialties/restore/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteRestore
  );
};
