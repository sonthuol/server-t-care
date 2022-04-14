const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const Doctor = db.doctor;
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { clinic } = require("../models");

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
