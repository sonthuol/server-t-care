const db = require("../models");
const Doctor = db.doctor;
const Schedule = db.schedule;
const MedicalRecords = db.medical_records;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

//Hiển thị lịch khám theo ngày
exports.showAppointmentByDay = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      attributes: ["id", "time", "status"],
      where: {
        day: req.query.day,
        status: 3,
      },
      order: [["time", "ASC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.doctorId,
          },
          attributes: ["id"],
        },
        {
          model: MedicalRecords,
          attributes: ["id", "name", "phoneNumber", "status"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị lịch hẹn thành công",
      data: schedule,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "NHiển thị lịch hẹn không thành công " + error.message,
      data: [],
    });
  }
};

//Hiển thị lịch khám theo ngày
exports.getMedicalRecordDetails = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecords.findAll({
      attributes: [
        "id",
        "name",
        "birthday",
        "gender",
        "phoneNumber",
        "symptom",
        "address",
        "status",
      ],
      where: {
        id: req.params.medicalRecordId,
      },
      include: [
        {
          model: Schedule,
          attributes: ["id", "day", "time"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị lịch hẹn chi tiết thành công",
      data: medicalRecords,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "NHiển thị lịch hẹn chi tiết không thành công " + error.message,
      data: [],
    });
  }
};
