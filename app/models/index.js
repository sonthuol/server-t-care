const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  timezone: config.timezone,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//Tạo bảng user
db.user = require("../models/user.model")(sequelize, Sequelize);
//Tạo bảng Role
db.role = require("../models/role.model")(sequelize, Sequelize);
// Tạo bảng Phòng khám
db.clinic = require("../models/clinic.model")(sequelize, Sequelize);
// Tạo bảng Chuyên khoa
db.specialty = require("../models/specialty.model")(sequelize, Sequelize);
// Tạo bảng bác sĩ
db.doctor = require("../models/doctor.model")(sequelize, Sequelize);
//Tạo bảng bệnh nhân
db.patient = require("../models/patient.model")(sequelize, Sequelize);

//Một clinic có nhiều user
db.clinic.belongsToMany(db.user, {
  through: "user_clinics",
  foreignKey: "clinicId",
  otherKey: "userId",
  timestamps: false,
});
//Một user có nhiều clinic
db.user.belongsToMany(db.clinic, {
  through: "user_clinics",
  foreignKey: "userId",
  otherKey: "clinicId",
  timestamps: false,
});

//Một clinic có nhiều user
db.doctor.belongsToMany(db.user, {
  through: "user_doctors",
  foreignKey: "doctorId",
  otherKey: "userId",
  timestamps: false,
});
//Một user có nhiều doctor
db.user.belongsToMany(db.doctor, {
  through: "user_doctors",
  foreignKey: "userId",
  otherKey: "doctorId",
  timestamps: false,
});

// Một chuyên khoa có nhiều phòng khám
db.specialty.belongsToMany(db.clinic, {
  through: "specialty_clinics",
  foreignKey: "specialtyId",
  otherKey: "clinicId",
  timestamps: false,
});

//Một phòng khám có nhiều chuyên khoa
db.clinic.belongsToMany(db.specialty, {
  through: "specialty_clinics",
  foreignKey: "clinicId",
  otherKey: "specialtyId",
  timestamps: false,
});

//Một chuyên khoa có nhiều bác sĩ
db.specialty.belongsToMany(db.doctor, {
  through: "specialty_doctors",
  foreignKey: "specialtyId",
  otherKey: "doctorId",
  timestamps: false,
});
//Một một bác sĩ có nhiều chuyên khoa
db.doctor.belongsToMany(db.specialty, {
  through: "specialty_doctors",
  foreignKey: "doctorId",
  otherKey: "specialtyId",
  timestamps: false,
});

//Một clinic có nhiều doctor
db.clinic.belongsToMany(db.doctor, {
  through: "doctor_clinics",
  foreignKey: "clinicId",
  otherKey: "doctorId",
  timestamps: false,
});
//Một doctor có nhiều clinic
db.doctor.belongsToMany(db.clinic, {
  through: "doctor_clinics",
  foreignKey: "doctorId",
  otherKey: "clinicId",
  timestamps: false,
});

//Một role có nhiều account
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
  timestamps: false,
});
//Một user có nhiều role
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  timestamps: false,
});
db.ROLES = ["root", "admin", "doctor", "receptionist"];
module.exports = db;
