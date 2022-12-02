const db = require("../models");
const MedicalRecords = db.medical_records;
const Doctor = db.doctor;
const Patient = db.patient;
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
