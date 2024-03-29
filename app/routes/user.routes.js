const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Người dùng thuộc phòng khám
  //method: GET
  //Access: Admin
  //URL:/api/userBelongClinic/:id
  app.get(
    "/api/user/userBelongClinic/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.userBelongClinic
  );

  //Người dùng thuộc bác sĩ
  //method: GET
  //Access: Admin
  //URL:/api/userBelongDoctor/:id
  app.get(
    "/api/user/userBelongDoctor/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.userBelongDoctor
  );

  //Ai cũng có quyền truy cập
  //method: GET
  //URL:/api/user/get-all-user
  app.get("/api/user/get-all-user", controller.getAllUser);

  //Ai cũng có quyền truy cập
  //method: GET
  //URL:/api/user/get-all-user
  app.get("/api/user/:id", controller.details);

  //Cập nhật phòng khám
  //method: PUT
  //Access: Root, Admin
  //URL:/api/clinics/:id
  app.put(
    "/api/user/:id",
    // [authJwt.verifyToken, authJwt.isRootAdmin],
    controller.update
  );

  //Xoá phòng khám (Cập nhẩ giá trị isDelete)
  //method: PATCH
  //Access: Root
  //URL:/api/clinics/:id
  app.patch(
    "/api/user/:id",
    // [authJwt.verifyToken, authJwt.isRoot],
    controller.delete
  );

  //Cập nhật thái người dùng (Cập nhẩ giá trị status)
  //method: PATCH
  //Access: Root
  //URL:/api/clinics/:id
  app.patch(
    "/api/user/changeStatus/:id",
    // [authJwt.verifyToken, authJwt.isRoot],
    controller.changeStatus
  );
};

// //Ai cũng có quyền truy cập
// //method: GET
// //URL:/api/test/all
// app.get("/api/test/all", controller.allAccess);

// //Truy cập đối với vai trò root
// //method: GET
// //URL: /api/test/root
// app.get(
//   "/api/test/root",
//   [authJwt.verifyToken, authJwt.isRoot],
//   controller.rootBoard
// );

// //Truy cập đối với vai trò admin
// //method: GET
// //URL: /api/test/admin
// app.get(
//   "/api/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// );

// //Truy cập đối với vai trò doctor
// //method: GET
// //URL: /api/test/admin
// app.get(
//   "/api/test/doctor",
//   [authJwt.verifyToken, authJwt.isDoctor],
//   controller.doctorBoard
// );

// //Truy cập đối với vai trò receptionst
// //method: GET
// //URL: /api/test/admin
// app.get(
//   "/api/test/receptionist",
//   [authJwt.verifyToken, authJwt.isReceptionist],
//   controller.receptionstBoard
// );
// };
