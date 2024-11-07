const { Band } = require("./models/Band");
const { Musician } = require("./models/Musician");
const { Song } = require("./models/Song");
const { Manager } = require("./models/Manager");

// Define associations here
Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, { through: "BandSongs" });
Band.belongsToMany(Song, { through: "BandSongs" });

Band.hasOne(Manager);
Manager.belongsTo(Band);

module.exports = {
  Band,
  Musician,
  Song,
  Manager,
};
