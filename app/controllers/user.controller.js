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
        isDelete: null,
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
