const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const Doctor = db.doctor;
const User = db.user;
const Op = db.Sequelize.Op;
const Patient = db.patient;
const MedicalRecords = db.medical_records;
const jwt = require("jsonwebtoken");
const { clinic } = require("../models");
const cloudinary = require("../config/cloudinary");
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

exports.getAllPatientByDoctorId = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: {
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: MedicalRecords,
          include: [
            {
              model: Doctor,
              where: {
                id: req.params.doctorId,
              },
            },
          ],
        },
      ],
    });
    const result = patients.filter((item) => item.medical_records.length != 0);
    res.status(200).send({
      status: 200,
      message: "Hiển thị thành công danh sách bệnh nhân của bác sĩ",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        "Hiển thị không thành công danh sách bệnh nhân của bác sĩ " +
        error.message,
      data: [],
    });
  }
};

//Tạo mới bác sĩ
exports.create = async (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(req.method);
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    if (req.method == "POST") {
      if (req.file) {
        const file = req.file;
        const { path } = file;
        console.log(path);
        const newPath = await uploader(path);
        data["image"] = newPath.url;
      }
    }
    const doctor = await Doctor.create(data);
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

//isClinic
exports.doctorBelongClinic = async (req, res) => {
  try {
    const idClinicOfDoctor = await Doctor.findOne({
      include: [Clinic],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      stauts: 200,
      message: "Success",
      data: idClinicOfDoctor.clinics,
    });
  } catch (error) {
    res.status(500).send({
      stauts: 500,
      message: "Fail",
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.displayTheNumberOfPatientsExaminedByWeek = async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate());

  var lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() + 7);

  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() - 7);
  try {
    const lastWeekCount = await MedicalRecords.count({
      where: {
        createdAt: {
          [Op.between]: [
            today.toISOString().split("T")[0] + " 00:00:00",
            lastWeek.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.id,
          },
          attributes: ["id"],
        },
      ],
    });
    const nextWeekCount = await MedicalRecords.count({
      where: {
        createdAt: {
          [Op.between]: [
            nextWeek.toISOString().split("T")[0] + " 00:00:00",
            today.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.id,
          },
          attributes: ["id"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: {
        lastWeekCount,
        nextWeekCount,
        summary: lastWeekCount - nextWeekCount,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.displayTheNumberOfPatientsExaminedByMonth = async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate());

  var lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() + 30);

  var nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() - 30);
  try {
    const lastMonthCount = await MedicalRecords.count({
      where: {
        createdAt: {
          [Op.between]: [
            today.toISOString().split("T")[0] + " 00:00:00",
            lastMonth.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.id,
          },
          attributes: ["id"],
        },
      ],
    });
    const nextMonthCount = await MedicalRecords.count({
      where: {
        createdAt: {
          [Op.between]: [
            nextMonth.toISOString().split("T")[0] + " 00:00:00",
            today.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.id,
          },
          attributes: ["id"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: {
        lastMonthCount,
        nextMonthCount,
        summary: lastMonthCount - nextMonthCount,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};

// Hiển thị tất cả hồ sơ khám bệnh được đặt bởi bác sĩ
exports.displayTheNumberOfPatientsExaminedByYear = async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate());

  var lastYear = new Date();
  lastYear.setDate(lastYear.getDate() + 360);

  var nextYear = new Date();
  nextYear.setDate(nextYear.getDate() - 360);
  try {
    const lastYearCount = await MedicalRecords.count({
      where: {
        createdAt: {
          [Op.between]: [
            today.toISOString().split("T")[0] + " 00:00:00",
            lastYear.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.id,
          },
          attributes: ["id"],
        },
      ],
    });
    const nextYearCount = await MedicalRecords.count({
      where: {
        createdAt: {
          [Op.between]: [
            nextYear.toISOString().split("T")[0] + " 00:00:00",
            today.toISOString().split("T")[0] + " 00:00:00",
          ],
        },
        isDelete: {
          [Op.or]: [0, null],
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Doctor,
          where: {
            id: req.params.id,
          },
          attributes: ["id"],
        },
      ],
    });
    res.status(200).send({
      status: 200,
      message: "Hiển thị danh sách hồ sơ khám bệnh thành công",
      data: {
        lastYearCount,
        nextYearCount,
        summary: lastYearCount - nextYearCount,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Hiển thị danh sách hồ sơ khám bệnh không thành công" + error,
      data: [],
    });
  }
};
