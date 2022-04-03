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

//Tạo chuyên khoa cho phòng khám
exports.create = async (req, res) => {
  try {
    const specialty = await Specialty.create(req.body);
    const clinic = await Clinic.findOne({
      where: {
        id: req.body.clinicId,
      },
    });
    const result = specialty.setClinics(clinic);
    res.status(200).send({
      status: 200,
      message: "Tạo chuyên khoa thành công",
      data: specialty,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Tạo chuyên khoa không thành công " + error.message,
      data: [],
    });
  }
};

//Cập nhật trạng thái phòng khám
exports.changeStatus = async (req, res) => {
  try {
    const specialty = await Specialty.update(
      { status: req.body.status, updateBy: req.body.userId },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Cập nhật chuyên khoa thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật chuyên khoa không thành công",
    });
  }
};

//Chi tiết chuyên khoa
exports.details = async (req, res) => {
  try {
    const specialty = await Specialty.findOne({
      where: { id: req.params.id },
      include: [Clinic],
    });
    res.status(200).send({
      status: 200,
      message: "Chuyên khoa của phòng khám tồn tại",
      data: specialty,
    });
  } catch (error) {
    {
      res.status(500).send({
        status: 500,
        message: "Chuyên khoa của phòng khám không tồn tại " + error.message,
        data: [],
      });
    }
  }
};

//Sửa phòng khám
exports.update = async (req, res) => {
  try {
    const specialty = await Specialty.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Cập nhật chuyên khoa thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật chuyên khoa không thành công",
    });
  }
};

//Xoá phòng khám
exports.delete = async (req, res) => {
  try {
    const specialty = await Specialty.update(
      { isDelete: 1, deleteBy: req.body.user },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Xoá chuyên khoa phòng khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Xoá chuyên khoa phòng khám không thành công",
    });
  }
};

//Danh sách khôi phục chuyên khoa
exports.restoreList = async (req, res) => {
  try {
    const specialtyRestore = await Specialty.findAll({
      where: { isDelete: 1 },
      order: [["id", "DESC"]],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách chuyên khoa cần khôi phục thành công",
      data: specialtyRestore,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        "Hiển thị danh sách chuyên khoa cần khôi phục không thành công " +
        error.message,
    });
  }
};
