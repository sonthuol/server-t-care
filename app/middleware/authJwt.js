const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { role } = require("../models");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.session.token;
  //   var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: 403,
      message: "No token provided || Không có token nào được cung cấp.",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized || Không được phép",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Là Root
isRoot = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "root") {
        return next();
      }
    }
    return res.status(403).send({
      status: 403,
      message: "Required Root Role || Bắt buộc vai trò là Root",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message:
        "Unable to validate User role! || Không thể xác nhận vai trò của người dùng ",
    });
  }
};

// Là Admin
isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(403).send({
      status: 403,
      message: "Required admin Role || Bắt buộc vai trò là admin",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message:
        "Unable to validate User role! || Không thể xác nhận vai trò của người dùng ",
    });
  }
};

// Là Bác sĩ
isDoctor = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "doctor") {
        return next();
      }
    }
    return res.status(403).send({
      status: 403,
      message: "Required doctor Role || Bắt buộc vai trò là doctor",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message:
        "Unable to validate User role! || Không thể xác nhận vai trò của người dùng ",
    });
  }
};

// Là Bác sĩ
isReceptionist = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "receptionist") {
        return next();
      }
    }
    return res.status(403).send({
      status: 403,
      message: "Required Receptionist Role || Bắt buộc vai trò là Receptionist",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message:
        "Unable to validate User role! || Không thể xác nhận vai trò của người dùng ",
    });
  }
};

const authJwt = {
  verifyToken,
  isRoot,
  isAdmin,
  isDoctor,
  isReceptionist,
};

module.exports = authJwt;
