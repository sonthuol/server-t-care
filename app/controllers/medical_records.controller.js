const db = require("../models");
const MedicalRecords = db.medical_records;
const Doctor = db.doctor;
const Patient = db.patient;
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

    medicalRecords.setDoctors(doctor);
    medicalRecords.setPatients(patient);

    return res.status(200).send({
      status: 200,
      message: "Đăng ký lịch thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
