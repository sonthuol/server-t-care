module.exports = (sequelize, Sequelize) => {
  const Specialty = sequelize.define(
    "specialties",
    {
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
      image: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
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
    },
    { timestamps: false }
  );

  return Specialty;
};
