const db = require("../models");
const Specialty = db.specialty;
const Clinic = db.clinic;
const Doctor = db.doctor;
const User = db.user;
const Schedule = db.schedule;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
