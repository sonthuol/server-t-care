const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const Doctor = db.doctor;
const User = db.user;
const Schedule = db.schedule;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

//Tạo mới bác sĩ
exports.create = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    const doctor = await Doctor.findOne({
      where: {
        id: req.body.doctorId,
      },
    });
    schedule.setDoctors(doctor);
    res.status(200).send({
      status: 200,
      message: "Tạo lịch khám thành công",
      data: schedule,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Tạo lịch khám không thành công " + error.message,
      data: [],
    });
  }
};

//Hiển thị lịch khám theo ngày
exports.showScheduleByDay = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      attributes: ["id", "time", "status"],
      where: { day: req.query.day },
      order: [["time", "ASC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.doctorId,
          },
          attributes: [],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị lịch khám",
      data: schedule,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Ngày tháng năm không tồn tại " + error.message,
      data: [],
    });
  }
};

//Hiển thị lịch khám theo ngày
exports.showScheduleByDayGetId = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      attributes: ["id"],
      where: { day: req.query.day },
      order: [["time", "ASC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.doctorId,
          },
          attributes: [],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị lịch khám",
      data: schedule,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Ngày tháng năm không tồn tại " + error.message,
      data: [],
    });
  }
};

//Cập nhật lịch khám trong một ngày với id
exports.update = async (req, res) => {
  try {
    const schedule = await Schedule.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Cập nhật lịch trình thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật lịch trình không thành công",
    });
  }
};
