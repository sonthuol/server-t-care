module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      //root, admin, doctor
      type: Sequelize.STRING,
      allowNull: false,
    },
    descriptionRole: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Role;
};
