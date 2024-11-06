const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");
const { seedBand, seedMusician, seedSong } = require("./seedData");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  let bands;
  let musicians;
  let songs;
  const randomNum = Math.floor(Math.random() * 3);
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });

    bands = await Band.bulkCreate(seedBand);
    musicians = await Musician.bulkCreate(seedMusician);
    songs = await Song.bulkCreate(seedSong);
  });

  test("can create a Band", async () => {
    expect(bands[randomNum]).toBeInstanceOf(Band);
  });

  test("can create a Musician", async () => {
    expect(musicians[0].name).toBe("Micheal Jackson");
  });

  test("can create a Song", async () => {
    expect(songs).toHaveLength(3);
  });

  test("can update a Band", async () => {
    await bands[0].update({ genre: "Alternative" });
    expect(bands[0].genre).toBe("Alternative");
  });

  test("can update a Musician", async () => {
    await musicians[randomNum].update({ name: "Jimi Hendrix" });
    expect(musicians[randomNum].name).toBe("Jimi Hendrix");
  });

  test("can update a Song", async () => {
    await songs[randomNum].update({ length: 215 });
    expect(songs[randomNum]).toEqual(expect.objectContaining({ length: 215 }));
  });

  test("can delete a Band", async () => {
    const newBand = await Band.create({ name: "Queen", genre: "Rock" });
    await newBand.destroy();
    expect(bands).toHaveLength(3);
  });

  test("can delete a Musician", async () => {
    const newMusician = await Musician.create({
      name: "Ludwig van Beethoven",
      instrument: "Piano",
    });
    const deletedMusician = await newMusician.destroy();
    expect(deletedMusician).toEqual(
      expect.objectContaining({
        name: "Ludwig van Beethoven",
        instrument: "Piano",
      })
    );
  });

  test("can delete a Song", async () => {
    const deleted = await Song.destroy({ where: { id: randomNum + 1 } });
    expect(deleted).toBe(1);
  });

  test("can increment showCount", async () => {
    await bands[0].increment("showCount", { by: 10 });
    await bands[0].reload();
    expect(bands[0].showCount).toBe(123);
  });

  test("can decrement showCount", async () => {
    await bands[0].decrement("showCount");
    await bands[0].reload();
    expect(bands[0].showCount).toBe(122);
  });

  test("toString will return the band name and genre", async () => {
    const bandString = await bands[0].toString();
    expect(bandString).toBe("Band: The Dirty Heads Genre: Alternative");
  });

  test("toMinutes can convert a songs seconds into runtime with minutes", async () => {
    const songInMinutes = await songs[1].toMinutes();
    expect(songInMinutes).toBe("This song is 3 minutes and 58 seconds long");
  });

  test("can find longest song", async () => {
    const longestSong = await songs[randomNum].getLongestSong();
    expect(longestSong).toBe("The longest song is Clair de Lune");
  });
});
