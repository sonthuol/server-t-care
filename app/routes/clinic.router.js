const { authJwt } = require("../middleware");
const controller = require("../controllers/clinic.controller");

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
    [authJwt.verifyToken, authJwt.isRootAdmin],
    controller.update
  );

  //Xoá phòng khám (Cập nhẩ giá trị isDelete)
  //method: PUT
  //Access: Root
  //URL:/api/clinics/:id
  app.patch(
    "/api/clinics/:id",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.delete
  );
};
