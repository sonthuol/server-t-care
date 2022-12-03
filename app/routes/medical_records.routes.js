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

  //Số lượt tài khoản đăng ký trong hệ thống
  //method: POST
  //URL: api/medical_records/register
  app.get(
    "/api/phan-tich/phan-tich-so-luong-phongkham-bacsi-benhnhan",
    controller.phanTichSoLuong
  );

  //Số lượt tài khoản đăng ký trong hệ thống
  //method: POST
  //URL: api/medical_records/register
  app.get(
    "/api/phan-tich/phan-tich-so-luong-phongkham-theo-thang",
    controller.phanTichSoLuongPhongKhamTheoThang
  );

  //Số lượt tài khoản đăng ký trong hệ thống
  //method: POST
  //URL: api/medical_records/register
  app.get(
    "/api/phan-tich-phong-kham/phan-tich-so-luong-phongkham-bacsi-benhnhan/:id",
    controller.phanTichPhongKhamSoLuong
  );

  //Số lượt tài khoản đăng ký trong hệ thống
  //method: POST
  //URL: api/medical_records/register
  app.get(
    "/api/phan-tich-phong-kham/phan-tich-so-luong-phongkham-theo-thang/:id",
    controller.phanTichPhongKhamDoanhThuTheoThang
  );
  //Hiển thị tất cả hồ sợ khám bệnh với trạng thái đang chờ xác nhận
  //method: POST
  //URL: api/medical_records/register
  app.put(
    "/api/medical-records/update-status-by-medical-record-id/:id",
    controller.updateStatusAppointment
  );
};
