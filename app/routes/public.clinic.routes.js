const controller = require("../controllers/public.clinic.controller");
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
  app.get("/api/public/clinics", controller.getAllClinics);
};
