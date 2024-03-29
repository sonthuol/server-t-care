module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("doctors", {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    image: {
      type: Sequelize.TEXT,
    },
    descriptionShort: {
      type: Sequelize.TEXT,
    },
    description: {
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
    addBy: {
      type: Sequelize.INTEGER,
    },
    updateBy: {
      type: Sequelize.INTEGER,
    },
    deleteBy: {
      type: Sequelize.INTEGER,
    },
  });
  return Doctor;
};
