const { sequelize, DataTypes } = require("../db");

let Band = sequelize.define("Band", {
  name: DataTypes.STRING,
  genre: DataTypes.STRING,
  showCount: DataTypes.INTEGER,
});

Band.prototype.toString = function () {
  console.log(`Band: ${this.name} Genre: ${this.genre}`);
  return `Band: ${this.name} Genre: ${this.genre}`;
};

module.exports = {
  Band,
};
