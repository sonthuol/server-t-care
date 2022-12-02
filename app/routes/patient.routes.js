const { verifySignUp } = require("../middleware");
const controller = require("../controllers/patient.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Đăng ký tài khoản bệnh nhân
  //method: POST
  //URL: api/patient/register
  app.post("/api/patient/signup", controller.signUp);

  //Đăng nhập tài khoản bệnh nhân
  //method: POST
  //URL: api/auth/login
  app.post("/api/patient/signin", controller.signIn);

  //Cập nhật thông tin tài khoản bệnh nhân
  //method: PUT
  //URL: api/patient/:patientId
  app.put("/api/patient/:patientId", controller.updateAccountPatient);
};
