const db = require("../models");
const Clinic = db.clinic;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { clinic } = require("../models");

//Danh sách các phòng khám
exports.getAllClinics = async (req, res) => {
  try {
    const clinic = await Clinic.findAll({
      where: { isDelete: 0 },
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

//Tạo phòng khám
exports.create = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(200).send({
      status: 200,
      message: "Tạo phòng khám thành công",
      data: clinic,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Tạo phòng khám không thành công",
      data: [],
    });
  }
};

//Chi tiết phòng khám
exports.details = async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ where: { id: req.params.id } });
    res.status(200).send({
      status: 200,
      message: "Phòng khám tồn tại",
      data: clinic,
    });
  } catch (error) {
    {
      res.status(500).send({
        status: 500,
        message: "Phòng khám không tồn tại",
        data: [],
      });
    }
  }
};

//Sửa phòng khám
exports.update = async (req, res) => {
  try {
    const clinic = await Clinic.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Cập nhật phòng khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật phòng khám không thành công",
    });
  }
};

//Xoá phòng khám
exports.delete = async (req, res) => {
  try {
    const clinic = await Clinic.update(
      { isDelete: 1 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Xoá phòng khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Xoá phòng khám không thành công",
    });
  }
};
