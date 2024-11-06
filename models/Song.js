const { Sequelize, sequelize, DataTypes } = require("../db");

let Song = sequelize.define("Song", {
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  length: DataTypes.INTEGER,
});

Song.prototype.toMinutes = function () {
  const timeArr = Number.parseFloat(this.length / 60)
    .toFixed(2)
    .split(".");
  console.log(
    `This song is ${timeArr[0]} minutes and ${timeArr[1]} seconds long`
  );
  return `This song is ${timeArr[0]} minutes and ${timeArr[1]} seconds long`;
};

Song.prototype.getLongestSong = async function () {
  const songs = await Song.findAll({ order: [["length", "DESC"]] });
  console.log(`The longest song is ${songs[0].title}`);
  return `The longest song is ${songs[0].title}`;
};

module.exports = {
  Song,
};
