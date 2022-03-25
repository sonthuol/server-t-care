const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Role,
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách tài khoản người dùng " + error.message,
      data: [],
    });
  }
};

exports.details = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      res.status(500).send({
        status: 500,
        message: "Người dùng không tồn tại ",
        data: [],
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "Người dùng tồn tại",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Người dùng không tồn tại " + error.message,
      data: [],
    });
  }
};

//Sửa user
exports.update = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Cập nhật tài khoản thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật thành công không thành công",
    });
  }
};

//Xoá user
exports.delete = async (req, res) => {
  try {
    const user = await User.update(
      { isDelete: 1, deleteBy: req.body.user },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Xoá tài khoản thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Xoá tài khoản không thành công",
    });
  }
};

//Cập nhật trạng thái phòng khám
exports.changeStatus = async (req, res) => {
  try {
    const user = await User.update(
      { isActive: req.body.status, updateBy: req.body.userId },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Cập nhật tài khoản thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật tài khoản không thành công",
    });
  }
};
