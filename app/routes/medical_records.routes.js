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
  app.post("/api/medical-records/register", controller.register);

  //Hiển thị tất cả hồ sợ khám bệnh với trạng thái đang chờ xác nhận
  //method: POST
  //URL: api/medical_records/register
  app.get(
    "/api/medical-records/get-all-medical-record-with-waiting-confirm/:patientId",
    controller.getAllMedicalRecordWithStatusWaitingConfirm
  );

  //Hiển thị tất cả hồ sợ khám bệnh với trạng thái đang chờ xác nhận
  //method: POST
  //URL: api/medical_records/register
  app.get(
    "/api/medical-records/get-all-medical-record-by-doctor-id/:doctorId",
    controller.getAllMedicalRecordByDoctorId
  );

  //Hiển thị tất cả hồ sợ khám bệnh với trạng thái đang chờ xác nhận
  //method: POST
  //URL: api/medical_records/register
  app.put(
    "/api/medical-records/update-status-by-medical-record-id/:id",
    controller.updateStatusAppointment
  );
};
