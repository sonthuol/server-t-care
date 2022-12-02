const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { clinic } = require("../models");

exports.getAllSpecialties = async (req, res) => {
  try {
    const specialty = await Specialty.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Clinic,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: specialty,
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

exports.getAllSpecialtiesByClinicId = async (req, res) => {
  console.log("====================================");
  console.log(req.params.clinic_id);
  console.log("====================================");
  try {
    const specialty = await Specialty.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Clinic,
          attributes: ["id"],
          where: {
            id: {
              [Op.eq]: req.params.clinic_id,
            },
          },
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: specialty,
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

exports.getFindSpecialtyBySpecialtyName = async (req, res) => {
  try {
    const specialty = await Specialty.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.key}%`,
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Clinic,
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: specialty,
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
