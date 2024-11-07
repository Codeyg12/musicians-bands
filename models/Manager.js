const { sequelize, DataTypes } = require("../db");

let Manager = sequelize.define("Manager", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  salary: DataTypes.INTEGER,
  dateHired: DataTypes.DATE,
});

module.exports = {
  Manager,
};
