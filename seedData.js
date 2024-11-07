const seedBand = [
  { name: "The Dirty Heads", genre: "Reggae Rock", showCount: 113 },
  { name: "Queen", genre: "Rock", showCount: 202 },
  { name: "The Beatles", genre: "Rock", showCount: 348 },
];

const seedMusician = [
  { name: "Micheal Jackson", instrument: "Voice" },
  { name: "Carlos Santana", instrument: "Guitar" },
  { name: "Ludwig van Beethoven", instrument: "Piano" },
];

const seedSong = [
  { title: "Clair de Lune", year: 1905, length: 300 },
  { title: "Lay Me Down", year: 2010, length: 215 },
  { title: "Darling", year: 2015, length: 238 },
];

const seedManager = [
  {
    name: "Bob",
    email: "bob@example.com",
    salary: 100000,
    dateHired: "2021-01-01",
  },
  {
    name: "Alice",
    email: "alice@example.com",
    salary: 90000,
    dateHired: "2021-10-20",
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    salary: 80000,
    dateHired: "2021-05-15",
  },
];

module.exports = {
  seedBand,
  seedMusician,
  seedSong,
  seedManager,
};
