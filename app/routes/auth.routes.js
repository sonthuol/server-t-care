const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Đăng ký tài khoản
  //method: POST
  //URL: api/auth/singup
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUp
  );

  //Đăng nhập tài khoản
  //method: POST
  //URL: api/auth/singin
  app.post("/api/auth/signin", controller.signIn);

  //Đăng xuất tài khoản
  //method: POST
  //URL: api/auth/singout
  app.post("/api/auth/signout", controller.signOut);
};
