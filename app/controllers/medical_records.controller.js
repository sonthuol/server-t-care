const db = require("../models");
const MedicalRecords = db.medical_records;
const Doctor = db.doctor;
const Patient = db.patient;
const Clinic = db.clinic;
const Specialty = db.specialty;
const Schedule = db.schedule;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

//Tạo lịch khám cho một bệnh nhân
exports.register = async (req, res) => {
  //Lưu tài khoản người dùng vào DB
  try {
    if (
      req.body.name === "" ||
      req.body.birthday === "" ||
      req.body.phoneNumber === "" ||
      req.body.address === "" ||
      req.body.symptom === "" ||
      req.body.gender === ""
    ) {
      return res.status(400).send({
        status: 400,
        message: "Yêu cầu nhập đầy đủ thông tin",
      });
    }
    // Insert vào table medical_records
    const medicalRecords = await MedicalRecords.create({
      name: req.body.name,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      symptom: req.body.symptom,
      gender: req.body.gender,
      status: req.body.status,
    });

    const doctor = await Doctor.findOne({
      where: {
        id: req.body.doctorId,
      },
    });

    const patient = await Patient.findOne({
      where: {
        id: req.body.patientId,
      },
    });

    const schedule = await Schedule.findOne({
      where: {
        id: req.body.scheduleId,
      },
    });

    await schedule.update({ status: 3 });
    await schedule.save();

    medicalRecords.setDoctors(doctor);
    medicalRecords.setPatients(patient);
    medicalRecords.setSchedules(schedule);

    return res.status(200).send({
      status: 200,
      message: "Đăng ký lịch khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.getAllMedicalRecordByDoctorId = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecords.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.doctorId,
          },
          attributes: ["id"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: medicalRecords,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công",
      data: [],
    });
  }
};

//Cập nhật trạng thái lịch khám
exports.updateStatusAppointment = async (req, res) => {
  try {
    const doctor = await MedicalRecords.update(
      { status: req.body.status },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Cập nhật trạng thái lịch khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật trạng thái lịch khám không thành công",
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh với trạng thái
exports.getAllMedicalRecordWithStatusWaitingConfirm = async (req, res) => {
  try {
    const { status } = req.query;

    const medicalRecords = await MedicalRecords.findAll({
      attributes: ["id"],
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
        status: status - 1,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Schedule,
          attributes: ["day", "time"],
        },
        {
          model: Patient,
          where: {
            id: req.params.patientId,
          },
          attributes: ["id"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách lịch khám thành công",
      data: medicalRecords,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách lịch khám không thành công",
      data: [],
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.phanTichSoLuong = async (req, res) => {
  try {
    const clinic = await Clinic.count();
    const doctor = await Doctor.count();
    const patient = await Patient.count();
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: {
        clinic,
        doctor,
        patient,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.phanTichSoLuongPhongKhamTheoThang = async (req, res) => {
  try {
    var thang1 = new Date();
    thang1.setDate(1);
    thang1.setMonth(0);
    var thang2 = new Date(thang1);
    thang2.setMonth(thang2.getMonth() + 1);

    var thang3 = new Date(thang2);
    thang3.setMonth(thang3.getMonth() + 1);

    var thang4 = new Date(thang3);
    thang4.setMonth(thang4.getMonth() + 1);

    var thang5 = new Date(thang4);
    thang5.setMonth(thang5.getMonth() + 1);

    var thang6 = new Date(thang5);
    thang6.setMonth(thang6.getMonth() + 1);

    var thang7 = new Date(thang6);
    thang7.setMonth(thang7.getMonth() + 1);

    var thang8 = new Date(thang7);
    thang8.setMonth(thang8.getMonth() + 1);

    var thang9 = new Date(thang8);
    thang9.setMonth(thang9.getMonth() + 1);

    var thang10 = new Date(thang9);
    thang10.setMonth(thang10.getMonth() + 1);

    var thang11 = new Date(thang10);
    thang11.setMonth(thang11.getMonth() + 1);

    var thang12 = new Date(thang11);
    thang12.setMonth(thang12.getMonth() + 1);

    var thang1namsau = new Date(thang11);
    thang1namsau.setMonth(thang1namsau.getMonth() + 1);
    const month01 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang1.toISOString().split("T")[0] + " 00:00:00",
            thang2.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });
    const month02 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang2.toISOString().split("T")[0] + " 00:00:00",
            thang3.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month03 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang3.toISOString().split("T")[0] + " 00:00:00",
            thang4.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month04 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang4.toISOString().split("T")[0] + " 00:00:00",
            thang5.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month05 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang5.toISOString().split("T")[0] + " 00:00:00",
            thang6.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month06 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang6.toISOString().split("T")[0] + " 00:00:00",
            thang7.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month07 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang7.toISOString().split("T")[0] + " 00:00:00",
            thang8.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month08 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang8.toISOString().split("T")[0] + " 00:00:00",
            thang9.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month09 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang9.toISOString().split("T")[0] + " 00:00:00",
            thang10.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month10 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang10.toISOString().split("T")[0] + " 00:00:00",
            thang11.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month11 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang11.toISOString().split("T")[0] + " 00:00:00",
            thang12.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    const month12 = await Clinic.count({
      where: {
        createdAt: {
          [Op.between]: [
            thang12.toISOString().split("T")[0] + " 00:00:00",
            thang1namsau.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
    });

    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: [
        {
          name: "01",
          "Số phòng khám": month01,
        },
        {
          name: "02",
          "Số phòng khám": month02,
        },
        {
          name: "03",
          "Số phòng khám": month03,
        },
        {
          name: "04",
          "Số phòng khám": month04,
        },
        {
          name: "05",
          "Số phòng khám": month05,
        },
        {
          name: "06",
          "Số phòng khám": month06,
        },
        {
          name: "07",
          "Số phòng khám": month07,
        },
        {
          name: "08",
          "Số phòng khám": month08,
        },
        {
          name: "09",
          "Số phòng khám": month09,
        },
        {
          name: "10",
          "Số phòng khám": month10,
        },
        {
          name: "11",
          "Số phòng khám": month11,
        },
        {
          name: "12",
          "Số phòng khám": month12,
        },
      ],
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.phanTichPhongKhamSoLuong = async (req, res) => {
  try {
    const specialty = await db.sequelize.query(
      `SELECT COUNT(*) as 'count' FROM specialty_clinics WHERE clinicId = ${req.params.id}`
    );
    const doctor = await db.sequelize.query(
      `SELECT COUNT(*) as 'count' FROM doctor_clinics WHERE clinicId = ${req.params.id}`
    );
    const medicalRecords = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record WHERE doctor.doctorId = medical_record.doctorId AND doctor.clinicId = ${req.params.id}`
    );
    // const doctor = await Doctor.count();
    // const patient = await Patient.count();
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: {
        specialty: specialty[0][0].count,
        doctor: doctor[0][0].count,
        medicalRecords: medicalRecords[0][0].count,
        // patient,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.phanTichPhongKhamDoanhThuTheoThang = async (req, res) => {
  try {
    var thang1 = new Date();
    thang1.setDate(1);
    thang1.setMonth(0);
    var thang2 = new Date(thang1);
    thang2.setMonth(thang2.getMonth() + 1);

    var thang3 = new Date(thang2);
    thang3.setMonth(thang3.getMonth() + 1);

    var thang4 = new Date(thang3);
    thang4.setMonth(thang4.getMonth() + 1);

    var thang5 = new Date(thang4);
    thang5.setMonth(thang5.getMonth() + 1);

    var thang6 = new Date(thang5);
    thang6.setMonth(thang6.getMonth() + 1);

    var thang7 = new Date(thang6);
    thang7.setMonth(thang7.getMonth() + 1);

    var thang8 = new Date(thang7);
    thang8.setMonth(thang8.getMonth() + 1);

    var thang9 = new Date(thang8);
    thang9.setMonth(thang9.getMonth() + 1);

    var thang10 = new Date(thang9);
    thang10.setMonth(thang10.getMonth() + 1);

    var thang11 = new Date(thang10);
    thang11.setMonth(thang11.getMonth() + 1);

    var thang12 = new Date(thang11);
    thang12.setMonth(thang12.getMonth() + 1);

    var thang1namsau = new Date(thang11);
    thang1namsau.setMonth(thang1namsau.getMonth() + 1);

    const month01 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang1.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang2.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x1 = month01[0][0].count * 300000;
    x1 = x1.toLocaleString("it-IT", { style: "currency", currency: "VND" });

    const month02 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang2.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang3.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x2 = month02[0][0].count * 300000;
    // x2 = x2.toLocaleString("it-IT", { style: "currency", currency: "VND" });

    const month03 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang3.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang4.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x3 = month03[0][0].count * 300000;
    // x3 = x3.toLocaleString("it-IT", { style: "currency", currency: "VND" });

    const month04 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang4.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang5.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x4 = month04[0][0].count * 300000;
    // x4 = x4.toLocaleString("it-IT", { style: "currency", currency: "VND" });

    const month05 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang5.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang6.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x5 = month05[0][0].count * 300000;
    // x5 = x5.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month06 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang6.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang6.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x6 = month06[0][0].count * 300000;
    // x6 = x6.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month07 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang7.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang8.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x7 = month07[0][0].count * 300000;
    // x7 = x7.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month08 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang8.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang9.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x8 = month08[0][0].count * 300000;
    // x = x8.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month09 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang9.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang10.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x9 = month09[0][0].count * 300000;
    // x9 = x9.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month10 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang10.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang11.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x10 = month10[0][0].count * 300000;
    // x10 = x10.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month11 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang11.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang12.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x11 = month11[0][0].count * 300000;
    // x11 = x11.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    const month12 = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM doctor_clinics doctor, doctor_medical_records medical_record, medical_records medical_record_main WHERE doctor.doctorId = medical_record.doctorId AND medical_record.medicalRecordId = medical_record_main.id AND doctor.clinicId = ${
        req.params.id
      } AND medical_record_main.createdAt BETWEEN '${
        thang12.toISOString().split("T")[0] + " 00:00:00"
      }' AND '${thang1namsau.toISOString().split("T")[0] + " 00:00:00"}'`
    );
    var x12 = month12[0][0].count * 300000;
    // x12 = x12.toLocaleString("it-IT", {
    //   style: "currency",
    //   currency: "VND",
    // });

    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: [
        {
          name: "01",
          "Doanh thu": x1,
        },
        {
          name: "02",
          "Doanh thu": x2,
        },
        {
          name: "03",
          "Doanh thu": x3,
        },
        {
          name: "04",
          "Doanh thu": x4,
        },
        {
          name: "05",
          "Doanh thu": x5,
        },
        {
          name: "06",
          "Doanh thu": x6,
        },
        {
          name: "07",
          "Doanh thu": x7,
        },
        {
          name: "08",
          "Doanh thu": x8,
        },
        {
          name: "09",
          "Doanh thu": x9,
        },
        {
          name: "10",
          "Doanh thu": x10,
        },
        {
          name: "11",
          "Doanh thu": x11,
        },
        {
          name: "12",
          "Doanh thu": x12,
        },
      ],
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};
