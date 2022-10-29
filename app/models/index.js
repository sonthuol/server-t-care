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
//Tạo bảng lịch khám
db.schedule = require("../models/schedule.model")(sequelize, Sequelize);
//Tạo bảng hồ sơ khám bệnh
db.medical_records = require("../models/medical_records.model")(
  sequelize,
  Sequelize
);

//Một bệnh nhân thì có một hồ sơ khám bệnh
db.patient.belongsToMany(db.medical_records, {
  through: "patient_medical_records",
  foreignKey: "patientId",
  otherKey: "medicalRecordId",
  timestamps: false,
});
//Một hồ sơ khám bệnh thì có một bệnh nhân
db.medical_records.belongsToMany(db.patient, {
  through: "patient_medical_records",
  foreignKey: "medicalRecordId",
  otherKey: "patientId",
  timestamps: false,
});

//Một lịch khám thì có một hồ sơ khám bệnh
db.schedule.belongsToMany(db.medical_records, {
  through: "schedule_medical_records",
  foreignKey: "ScheduleId",
  otherKey: "medicalRecordId",
  timestamps: false,
});
//Một hồ sơ khám bệnh thì có một lịch khám
db.medical_records.belongsToMany(db.schedule, {
  through: "schedule_medical_records",
  foreignKey: "medicalRecordId",
  otherKey: "ScheduleId",
  timestamps: false,
});

// Một bác sĩ thì khám nhiều hồ sơ khám bệnh
db.doctor.belongsToMany(db.medical_records, {
  through: "doctor_medical_records",
  foreignKey: "doctorId",
  otherKey: "medicalRecordId",
  timestamps: false,
});

// Một hồ sơ khám bệnh thì có một bác sĩ khám
db.medical_records.belongsToMany(db.doctor, {
  through: "doctor_medical_records",
  foreignKey: "medicalRecordId",
  otherKey: "doctorId",
  timestamps: false,
});

//Một bác sĩ có nhiều lịch khám
db.doctor.belongsToMany(db.schedule, {
  through: "doctor_schedules",
  foreignKey: "doctorId",
  otherKey: "scheduleId",
  timestamps: false,
});
//Một lịch khám thuộc nhiều bác sĩ
db.schedule.belongsToMany(db.doctor, {
  through: "doctor_schedules",
  foreignKey: "scheduleId",
  otherKey: "doctorId",
  timestamps: false,
});

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
