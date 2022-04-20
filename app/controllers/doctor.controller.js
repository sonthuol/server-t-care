const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const Doctor = db.doctor;
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { clinic } = require("../models");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Clinic,
        },
        {
          model: Specialty,
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách phòng khám thành công",
      data: doctor,
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

//Tạo mới bác sĩ
exports.create = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    const clinic = await Clinic.findOne({
      where: {
        id: req.body.clinicId,
      },
    });
    const specialty = await Specialty.findOne({
      where: {
        id: req.body.specialties,
      },
    });
    doctor.setClinics(clinic);
    doctor.setSpecialties(specialty);
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    doctor.setUsers(user);
    res.status(200).send({
      status: 200,
      message: "Tạo mới bác sĩ thành công",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Tạo mới bác sĩ không thành công " + error.message,
      data: [],
    });
  }
};

//Chi tiết bác sĩ
exports.details = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { id: req.params.id },
      include: [Clinic, Specialty],
    });
    res.status(200).send({
      status: 200,
      message: "Bác sĩ của phòng khám tồn tại",
      data: doctor,
    });
  } catch (error) {
    {
      res.status(500).send({
        status: 500,
        message: "Bác sĩ của phòng khám không tồn tại " + error.message,
        data: [],
      });
    }
  }
};

//Cập nhật trạng thái bác sĩ
exports.changeStatus = async (req, res) => {
  try {
    const doctor = await Doctor.update(
      { isActive: req.body.isActive, updateBy: req.body.userId },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Cập nhật trạng thái bác sĩ thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật trạng thái bác s không thành công",
    });
  }
};

//Sửa bác sĩ
exports.update = async (req, res) => {
  try {
    const doctor = await Doctor.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // const specialty = await Specialty.findOne({
    //   where: {
    //     id: req.body.specialtyId,
    //   },
    // });
    // doctor.setSpecialties(specialty);
    res.status(200).send({
      status: 200,
      message: "Cập nhật bác sĩ thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cập nhật bác sĩ không thành công " + error.message,
    });
  }
};

//Xoá bác sĩ
exports.delete = async (req, res) => {
  try {
    const doctor = await Doctor.update(
      { isDelete: 1, deleteBy: req.body.user },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Xoá bác sĩ thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Xoá bác sĩ không thành công",
    });
  }
};

//Danh sách khôi phục bác sĩ
exports.restoreList = async (req, res) => {
  try {
    const doctorRestore = await Doctor.findAll({
      where: { isDelete: 1 },
      order: [["id", "DESC"]],
      include: [
        {
          model: Clinic,
        },
        {
          model: Specialty,
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách bác sĩ cần khôi phục thành công",
      data: doctorRestore,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        "Hiển thị danh sách bác sĩ cần khôi phục không thành công " +
        error.message,
    });
  }
};

//Khôi phục bác sĩ
exports.restoreDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.update(
      { isDelete: 0, deleteBy: 0 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Khôi phục bác sĩ thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Khôi phục bác sĩ không thành công " + error.message,
    });
  }
};

//Xoá bác sĩ vĩnh viễn khỏi cơ sở dữ liệu
exports.deleteRestore = async (req, res) => {
  try {
    const doctor = await Doctor.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Xoá vĩnh viễn bác sĩ thành công",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Xoá vĩnh viễn bác sĩ không thành công",
    });
  }
};
