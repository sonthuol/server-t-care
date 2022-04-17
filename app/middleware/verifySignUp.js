const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    //Kiểm tra username đã tồn tại trong DB chưa
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        status: 400,
        message: "Thất bại, Tên tài khoản đã tồn tại",
      });
    }

    // //Kiểm tra email đã tồn tại trong DB chưa
    // let email = await User.findOne({
    //   where: {
    //     email: req.body.email,
    //   },
    // });

    // if (email) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: "Thất bại, Email đã tồn tại",
    //   });
    // }
    next();
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Không thể kiếm tra, xác thực tên tài khoản",
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          status: 400,
          message:
            "Thất bại! Quyền truy cập này " +
            req.body.roles[i] +
            " Không tồn tại",
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};
module.exports = verifySignUp;
