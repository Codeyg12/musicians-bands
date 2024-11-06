const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    let band
    let musician
    let song
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        band = await Band.create({name: "The Dirty Heads", genre: "Reggae Rock"})
        musician = await Musician.create({ name: "Micheal Jackson", instrument: "Voice"})
        song = await Song.create({title: "Clair de Lune", year: 1905, length: 300})
    })

    test('can create a Band', async () => {
        expect(band).toBeInstanceOf(Band)
    })

    test('can create a Musician', async () => {
        expect(musician.name).toBe("Micheal Jackson")
    })

    test('can create a Song', async () => {
        const songs = await Song.findAll()
        expect(songs).toHaveLength(1)
    })

    test('can update a Band', async () => {
        await band.update({ genre: "Alternative"})
        expect(band.genre).toBe("Alternative")
    })

    test('can update a Musician', async () => {
        await musician.update({name: "Carlos Santana", instrument: "Guitar"})
        expect(musician.name).toBe("Carlos Santana")
        expect(musician.instrument).toBe("Guitar")
    })

    test('can update a Song', async () => {
        await song.update({ title: "Lay Me Down", year: 2010, length: 215})
        expect(song).toEqual(expect.objectContaining({title: "Lay Me Down", year: 2010, length: 215}))
    })

    test('can delete a Band', async () => {
       const newBand = await Band.create({name: "Queen", genre: "Rock"})
        await newBand.destroy()
        const bands = await Band.findAll()
       expect(bands).toHaveLength(1)
    })

    test('can delete a Musician', async () => {
        const newMusician = await Musician.create({name: "Ludwig van Beethoven", instrument: "Piano"})
        const deletedMusician = await newMusician.destroy()
        expect(deletedMusician).toEqual(expect.objectContaining({ name: "Ludwig van Beethoven", instrument: "Piano"}))
    })

    test('can delete a Song', async () => {
        await song.destroy()
        const songs = await Song.findAll()
        expect(songs).toHaveLength(0)
    })
})