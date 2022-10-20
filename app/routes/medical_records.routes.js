const { verifySignUp } = require("../middleware");
const controller = require("../controllers/medical_records.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Đặt lịch khám
  //method: POST
  //URL: api/medical_records/register
  app.post("/api/medical_records/register", controller.register);
};
