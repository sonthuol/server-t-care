const db = require("../models");
const Clinic = db.clinic;
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { clinic } = require("../models");
const cloudinary = require("../config/cloudinary");
//Danh sách các phòng khám
exports.getAllClinics = async (req, res) => {
  try {
    const clinic = await Clinic.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: clinic,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách phòng khám không thành công",
      data: [],
    });
  }
};
