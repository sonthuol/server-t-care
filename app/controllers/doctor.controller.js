const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const Doctor = db.doctor;
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { clinic } = require("../models");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Clinic,
        },
        {
          model: Specialty,
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        "Hiển thị danh sách phòng khám không thành công " + error.message,
      data: [],
    });
  }
};

//Tạo mới bác sĩ
exports.create = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    const clinic = await Clinic.findOne({
      where: {
        id: req.body.clinicId,
      },
    });
    const specialty = await Specialty.findOne({
      where: {
        id: req.body.specialties,
      },
    });
    doctor.setClinics(clinic);
    doctor.setSpecialties(specialty);
    res.status(200).send({
      status: 200,
      message: "Tạo mới bác sĩ thành công",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Tạo mới bác sĩ không thành công " + error.message,
      data: [],
    });
  }
};
