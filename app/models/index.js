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
// Tạo bảng Phòng khám
db.clinic = require("../models/clinic.model")(sequelize, Sequelize);
// Tạo bảng Chuyên khoa
db.specialty = require("../models/specialty.model")(sequelize, Sequelize);
// Tạo bảng bác sĩ
db.doctor = require("../models/doctor.model")(sequelize, Sequelize);
//Tạo bảng bệnh nhân
db.patient = require("../models/patient.model")(sequelize, Sequelize);
//Tạo bảng user
db.user = require("../models/user.model")(sequelize, Sequelize);
//Tạo bảng Role
db.role = require("../models/role.model")(sequelize, Sequelize);

//Một phòng khám có nhiều chuyên khoa
db.clinic.belongsToMany(db.specialty, {
  through: "clinic_specialties",
  foreignKey: "specialtyId",
  otherKey: "clinicId",
  timestamps: false,
});

// Một chuyên khoa có nhiều phòng khám
db.specialty.belongsToMany(db.clinic, {
  through: "clinic_specialties",
  foreignKey: "clinicId",
  otherKey: "specialtyId",
  timestamps: false,
});

//Một bác sĩ thuộc một phòng khám
db.doctor.hasOne(db.clinic, {
  through: "clinic_doctors",
  foreignKey: "clinicId",
  otherKey: "doctorId",
  timestamps: false,
});

//Một phòng khám có nhiều bác sĩ
db.clinic.belongsToMany(db.doctor, {
  through: "clinic_doctors",
  foreignKey: "doctorId",
  otherKey: "clinicId",
  timestamps: false,
});

//Một chuyên khoa có nhiều bác sĩ
db.specialty.belongsToMany(db.doctor, {
  through: "specialty_doctors",
  foreignKey: "doctorId",
  otherKey: "specialtyId",
  timestamps: false,
});
//Một một bác sĩ có nhiều chuyên khoa
db.doctor.hasOne(db.specialty, {
  through: "clinic_doctors",
  foreignKey: "specialtyId",
  otherKey: "doctorId",
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
