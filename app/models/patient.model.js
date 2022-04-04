module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patients", {
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
    age: {
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
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
    },
    image: {
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
  return Patient;
};
