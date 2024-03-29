module.exports = (sequelize, Sequelize) => {
  const Clinic = sequelize.define("clinics", {
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
    description: {
      type: Sequelize.TEXT,
    },
    status: {
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
  return Clinic;
};
