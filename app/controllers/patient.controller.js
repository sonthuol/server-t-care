const db = require("../models");
const Patient = db.patient;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

//Tạo một tài khoản mới cho người dùng
exports.signUp = async (req, res) => {
  //Lưu tài khoản người dùng vào DB
  try {
    if (
      req.body.fullName === "" ||
      req.body.phoneNumber === "" ||
      req.body.password === ""
    ) {
      return res.status(400).send({
        status: 400,
        message: "Yêu cầu nhập đầy đủ thông tin",
      });
    }
    const checkPhoneNumberExist = await Patient.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
        isActive: {
          [Op.or]: [true, null],
        },
      },
    });
    if (checkPhoneNumberExist) {
      return res.status(400).send({
        status: 400,
        message: "Số điện thoại đã được đăng ký",
      });
    }
    const patient = await Patient.create({
      name: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    return res.status(200).send({
      status: 200,
      message: "Đăng ký tài khoản thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

//Tạo một tài khoản mới cho người dùng
exports.updateAccountPatient = async (req, res) => {
  //Lưu tài khoản người dùng vào DB
  try {
    const patient = await Patient.update(
      {
        name: req.body.name,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        gender: req.body.gender,
      },
      {
        where: {
          id: req.params.patientId,
        },
      }
    );
    return res.status(200).send({
      status: 200,
      message: "Cập nhật thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

//Đăng nhập tài khoản
exports.signIn = async (req, res) => {
  try {
    if (req.body.phoneNumber === "" || req.body.password === "") {
      return res.status(400).send({
        status: 400,
        message: "Yêu cầu nhập đầy đủ thông tin",
      });
    }
    const patient = await Patient.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
        isActive: {
          [Op.or]: [true, null],
        },
      },
    });

    if (!patient) {
      return res.status(400).send({
        status: 400,
        message: "Số điện thoại chưa được đăng ký",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      patient.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        status: 401,
        message: "Mật khẩu không hợp lệ",
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Đăng nhập thành công",
      data: {
        patient,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
