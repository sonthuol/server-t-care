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
db.clinic = require("../models/clinic.model")(sequelize, Sequelize);
db.specialty = require("../models/specialty.model")(sequelize, Sequelize);
db.specialty.belongsToMany(db.clinic, {
  through: "clinic_specialties",
  foreignKey: "clinicId",
  otherKey: "specialtyId",
  timestamps: false,
});
db.clinic.belongsToMany(db.specialty, {
  through: "clinic_specialties",
  foreignKey: "specialtyId",
  otherKey: "clinicId",
  timestamps: false,
});
module.exports = db;
