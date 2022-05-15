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

//Tạo phòng khám
exports.create = async (req, res) => {
  const data = req.body;
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    if (req.method == "POST") {
      if (req.file) {
        const file = req.file;
        const { path } = file;
        const newPath = await uploader(path);
        data["image"] = newPath.url;
      }
    }
    const clinic = await Clinic.create(data);
    const user = await User.findAll({
      where: {
        username: req.body.username,
      },
    });
    const result = clinic.setUsers(user);
    res.status(200).send({
      status: 200,
      message: "Tạo phòng khám thành công",
      data: clinic,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Tạo phòng khám không thành công" + error.message,
      data: [],
    });
  }
};

//Chi tiết phòng khám
exports.details = async (req, res) => {
  try {
    const clinic = await Clinic.findOne({
      where: { id: req.params.id },
      include: [User],
    });
    res.status(200).send({
      status: 200,
      message: "Phòng khám tồn tại",
      data: clinic,
    });
  } catch (error) {
    {
      res.status(500).send({
        status: 500,
        message: "Phòng khám không tồn tại " + error.message,
        data: [],
      });
    }
  }
};

//Sửa phòng khám
exports.update = async (req, res) => {
  const clinic = req.body;
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    if (req.method == "PUT") {
      if (req.file) {
        const file = req.file;
        const { path } = file;
        const newPath = await uploader(path);
        clinic["image"] = newPath.url;
      }
    }
    await Clinic.update(clinic, {
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
      { isDelete: 1, deleteBy: req.body.user },
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

//Cập nhật trạng thái phòng khám
exports.changeStatus = async (req, res) => {
  try {
    const clinic = await Clinic.update(
      { status: req.body.status, updateBy: req.body.userId },
      {
        where: {
          id: req.params.id,
        },
      }
    );
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

//Danh sách khôi phục phòng khám
exports.restoreList = async (req, res) => {
  try {
    const clinicRestore = await Clinic.findAll({
      where: { isDelete: 1 },
      order: [["id", "DESC"]],
    });

    console.log(clinicRestore);

    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám cần khôi phục thành công",
      data: clinicRestore,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        "Hiển thị danh sách phòng khám cần khôi phục không thành công " +
        error.message,
    });
  }
};

//Xoá phòng khám vĩnh viễn khỏi cơ sở dữ liệu
exports.deleteRestore = async (req, res) => {
  try {
    const clinic = await Clinic.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Xoá vĩnh viễn phòng khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Xoá vĩnh viễn phòng khám không thành công",
    });
  }
};

//Khôi phục phòng khám
exports.restoreClinic = async (req, res) => {
  try {
    const clinic = await Clinic.update(
      { isDelete: 0, deleteBy: 0 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Khôi phục phòng khám thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Khôi phục phòng khám không thành công " + error.message,
    });
  }
};
