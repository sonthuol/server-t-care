const { authJwt } = require("../middleware");
const controller = require("../controllers/clinic.controller");
const upload = require("../config/multer");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Hiển thị danh sách tất cả các phòng khám
  //method: GET
  //Access: Root, Admin
  //URL:/api/clinics
  app.get(
    "/api/clinics",
    [authJwt.verifyToken, authJwt.isRootAdmin],
    controller.getAllClinics
  );

  //Hiển thị danh sách phòng khám cần khôi phục(Xoá khỏi mất từ CSDL)
  //method: GET
  //Access: Root
  //URL:/api/clinics/restore
  app.get(
    "/api/clinics/restore",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.restoreList
  );

  //Hiển thị danh sách tất cả các phòng khám
  //method: GET
  //Access: Root, Admin
  //URL:/api/clinics/:id
  app.get(
    "/api/clinics/:id",
    [authJwt.verifyToken, authJwt.isRootAdmin],
    controller.details
  );

  //Tạo một phòng khám
  //method: POST
  //Access: Root
  //URL:/api/clinics
  app.post(
    "/api/clinics",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.create
  );
  //Cập nhật phòng khám
  //method: PUT
  //Access: Root, Admin
  //URL:/api/clinics/:id
  app.put(
    "/api/clinics/:id",
    upload.single("file"),
    [authJwt.verifyToken, authJwt.isRootAdmin],
    controller.update
  );

  //Cập nhật trạngt thái phòng khám (Cập nhẩ giá trị status)
  //method: PATCH
  //Access: Root
  //URL:/api/clinics/:id
  app.patch(
    "/api/clinics/changeStatus/:id",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.changeStatus
  );

  //Xoá phòng khám (Cập nhẩ giá trị isDelete)
  //method: PATCH
  //Access: Root
  //URL:/api/clinics/:id
  app.patch(
    "/api/clinics/:id",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.delete
  );

  //Khôi phục phòng khám
  //method: PATCH
  //Access: Root
  //URL:/api/clinics/restore/:id
  app.patch(
    "/api/clinics/restore/:id",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.restoreClinic
  );

  //Xoá phòng khám vĩnh viễn(Xoá khỏi mất từ CSDL)
  //method: DELETE
  //Access: Root
  //URL:/api/clinics/restore/:id
  app.delete(
    "/api/clinics/restore/:id",
    // [authJwt.verifyToken, authJwt.isRoot],
    controller.deleteRestore
  );
};
