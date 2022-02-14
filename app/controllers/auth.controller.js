const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Tạo một tài khoản mới cho người dùng
exports.signUp = async (req, res) => {
  //Lưu tài khoản người dùng vào DB
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      const result = user.setRoles(roles);
      if (result) res.send({ message: "Tạo tài khoản thành công!" });
    } else {
      //Mặc định người dùng là root
      const result = user.setRoles(1);
      if (result) res.send({ message: "Tạo tài khoản thành công!" });
    }
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
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "Người dùng không tồn tại",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        status: 401,
        message: "Mật khẩu không hợp lệ",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.secret,
      {
        expiresIn: 86400, //24 hours
      }
    );

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    req.session.token = token;
    return res.status(200).send({
      status: 200,
      message: "Đăng nhập thành công",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        roles: authorities,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

//Đăng xuất
exports.signOut = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      status: 200,
      message: "Bạn đã đăng xuất tài khoản",
    });
  } catch (error) {
    this.next(error);
  }
};
