const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Ai cũng có quyền truy cập
  //method: GET
  //URL:/api/test/all
  app.get("/api/test/all", controller.allAccess);

  //Truy cập đối với vai trò root
  //method: GET
  //URL: /api/test/root
  app.get(
    "/api/test/root",
    [authJwt.verifyToken, authJwt.isRoot],
    controller.rootBoard
  );

  //Truy cập đối với vai trò admin
  //method: GET
  //URL: /api/test/admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //Truy cập đối với vai trò doctor
  //method: GET
  //URL: /api/test/admin
  app.get(
    "/api/test/doctor",
    [authJwt.verifyToken, authJwt.isDoctor],
    controller.doctorBoard
  );

  //Truy cập đối với vai trò receptionst
  //method: GET
  //URL: /api/test/admin
  app.get(
    "/api/test/receptionst",
    [authJwt.verifyToken, authJwt.isReceptionist],
    controller.receptionstBoard
  );
};
