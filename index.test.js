const { sequelize } = require("./db");
const { Band, Musician, Song, Manager } = require("./index");
const { seedBand, seedMusician, seedSong, seedManager } = require("./seedData");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  let bands;
  let musicians;
  let songs;
  let managers;
  const randomNum = Math.floor(Math.random() * 3);
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });

    bands = await Band.bulkCreate(seedBand);
    musicians = await Musician.bulkCreate(seedMusician);
    songs = await Song.bulkCreate(seedSong);
    managers = await Manager.bulkCreate(seedManager);
  });

  describe("band tests", () => {
    test("can create a Band", async () => {
      expect(bands[randomNum]).toBeInstanceOf(Band);
    });

    test("can update a Band", async () => {
      await bands[0].update({ genre: "Alternative" });
      expect(bands[0].genre).toBe("Alternative");
    });

    test("can delete a Band", async () => {
      const newBand = await Band.create({ name: "Queen", genre: "Rock" });
      await newBand.destroy();
      expect(bands).toHaveLength(3);
    });
  });

  describe("musician tests", () => {
    test("can create a Musician", async () => {
      expect(musicians[0].name).toBe("Micheal Jackson");
    });

    test("can update a Musician", async () => {
      await musicians[randomNum].update({ name: "Jimi Hendrix" });
      expect(musicians[randomNum].name).toBe("Jimi Hendrix");
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
  });

  describe("song tests", () => {
    test("can create a Song", async () => {
      expect(songs).toHaveLength(3);
    });

    test("can update a Song", async () => {
      await songs[0].update({ length: 215 });
      expect(songs[0]).toEqual(expect.objectContaining({ length: 215 }));
    });

    test("can delete a Song", async () => {
      const deleted = await Song.destroy({ where: { id: 3 } });
      expect(deleted).toBe(1);
    });
  });

  describe("manager tests", () => {
    test("can create a Manager", async () => {
      expect(managers[0]).toBeInstanceOf(Manager);
    });

    test("can update a Manager", async () => {
      await managers[0].update({ name: "Scooter Braun" });
      expect(managers[0].name).toBe("Scooter Braun");
    });

    test("can delete a Manager", async () => {
      const newManager = await Manager.create({
        name: "Mike Mikeson",
        email: "mike@example.com",
        salary: 200000,
        dateHired: "2021-01-01",
      });
      await newManager.destroy();
      const allManagers = await Manager.findAll();
      expect(allManagers).toHaveLength(3);
    });
  });

  describe("counting tests", () => {
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
  });

  describe("Instance methods", () => {
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

  describe("association tests", () => {
    describe("Band and Musician", () => {
      let bandMembers;
      beforeAll(async () => {
        const musician1 = await Musician.findByPk(1);
        const musician2 = await Musician.findByPk(2);
        const band = await Band.findByPk(1);
        await band.addMusicians([musician1, musician2]);
        bandMembers = await band.getMusicians();
      });
      test("multiple musicians can be added to a band", async () => {
        expect(bandMembers).toHaveLength(2);
      });
      test("each musician has only one band", () => {
        expect(bandMembers[0]).toEqual(expect.objectContaining({ BandId: 1 }));
        expect(bandMembers[1]).toEqual(expect.objectContaining({ BandId: 1 }));
      });
      test("eager loading works", async () => {
        const band = await Band.findByPk(1, { include: Musician });
        expect(band.Musicians).toHaveLength(2);
      });
    });

    describe("Band and Song", () => {
      let band1Songs;
      let band2Songs;

      beforeAll(async () => {
        const song1 = await Song.findByPk(1);
        const song2 = await Song.findByPk(2);
        const band1 = await Band.findByPk(1);
        const band2 = await Band.findByPk(2);

        await band1.addSongs([song1, song2]);
        await band2.addSongs([song1]);

        band1Songs = await band1.getSongs();
        band2Songs = await band2.getSongs();
      });
      test("multiple songs can be added to a band", () => {
        expect(band1Songs).toHaveLength(2);
      });
      test("multiple bands can have the same song", () => {
        expect(band1Songs[0].title).toEqual(songs[0].title);
        expect(band2Songs[0].title).toEqual(songs[0].title);
      });
    });
  });
});
