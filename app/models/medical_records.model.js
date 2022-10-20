module.exports = (sequelize, Sequelize) => {
  const MedicalRecords = sequelize.define("medical_records", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    phoneNumber: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    symptom: {
      type: Sequelize.TEXT,
    },
    address: {
      type: Sequelize.TEXT,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    deleteBy: {
      type: Sequelize.INTEGER,
    },
  });
  return MedicalRecords;
};
