const arrLen = 2
const tardis = {
  name: 'TARDIS',
  class: 'Time and Relative Dimension in Space',
  modelType: 40,
  manufacturer: 'Gallifrey',
  features: [
    'Bigger on the inside',
    'Space Transport',
    'Time Travel'
  ],
  exterior: {
    policeBox: ['1963', '1966', '1976', '1980', '1996', '2005', '2010', '2014'],
    car: 'Bessie'
  }
}
const serenity = {
  url: 'https://en.wikipedia.org/wiki/Serenity_(Firefly_vessel)',
  class: 'Firefly-Class Transport Ship',
  classCode: '03-K64',
  model: 'aught three',
  designDate: 'August 2459',
  technicalSpecifications: {
    lengthInMeters: 82,
    beamInMeters: 52,
    heightInMeters: 24,
    curbWeightInKg: 128100,
    cargoCapacityInKg: 748000,
    personnelCapacity: 18,
    maxAcceleration: '4.2g',
    rangeInAstronomicalUnits: 440
  },
  interior: {
    upperDeck: [
      'Bridge',
      'Corridor',
      'Airlock',
      'Galley',
      'Engine Room'
    ],
    lowerDeck: [
      'Main Airlock',
      'Cargo Bay',
      'Common Area',
      'Infirmary',
      'Passenger Quarters'
    ]
  },
  engine: 'Standard Radion-Accelerator Core',
  armament: null,
  defense: 'Crybabies - decoy buoys used to mimic other ships',
  primaryFeature: 'Fast'
}
const deathStar = {
  url: 'http://starwars.wikia.com/wiki/DS-1_Orbital_Battle_Station',
  production: {
    model: 'DS-1 Orbital Battle Station',
    manufacturer: [
      'Advanced Weapons Researce',
      'Kuat Drive Yards',
      'Sienar Fleet Systems'
    ],
    designer: [
      'Geonosians',
      'Stalgasin Hive',
      'Project Celestial Power',
      'Galen Walton Erso'
    ],
    class: 'Space Battle Station',
    cost: 1000000000000
  },
  specifications: {
    widthInKm: '160',
    hyperdriveRating: [
      'Class 4',
      'Class 20 (backup)'
    ],
    powerPlant: 'Hpermatter Reactor',
    armament: [
      'Mk 1 Superlaser',
      'Tractor Beam Emplaceements',
      'Turbolaser Batteries (15,000)',
      'Super Blaster 920 Laser Cannons (2,500)',
      'Ion Cannons (2,500)'
    ],
    complement: 'TIE / In Space Superiority Starfighters (7,200)',
    crew: {
      personnel: '1,186,295 - 1,206,293',
      imperialNavyAndArmy: 342953,
      stormtroopers: 25984
    },
    cargoCapacityInKilotons: 1000000,
    consumables: 'Three Standard Years',
    communicationSystems: 'Equipped',
    otherSystems: [
      'High-speed, officer-use shuttle system',
      'Emergency-use Life Support Modules'
    ]
  },
  locationInformation: {
    planet: [
      'Geonosis',
      'Scarif',
      'Alderaan',
      'Yavin'
    ]
  },
  usage: {
    roles: 'Planet-destroying Battle Station',
    affiliation: [
      'Confederacy of Independent Systems',
      'Galactic Republic',
      'Galactic Empire Imperial Navy'
    ],
    constructed: [
      'Phase one completed in 21 BBY',
      'Completed in 0 BBY'
    ],
    destroyed: '0 BBY during the Battle of Yarvin',
    battles: [
      'Destruction of Jedha City',
      'Battle of Scarif',
      'The Disaster',
      'Rescue of Princess Leia',
      'Battle of Yavin'
    ],
    crewmembers: [
      'Shann Childsen',
      'Thane Kyrell',
      'Conan Antonio Matti',
      'MSE-6-G735Y',
      'Pamel Poul',
      'TK-421',
      'TK-450',
      'Wullf Yularen'
    ],
    commanders: [
      'Director Orson Callan Krennic',
      'Grand Moff Wilhuff Tarkin'
    ],
    aliases: [
      'DS-1 Platform',
      'Sentinel Base',
      'Ultimate Weapon'
    ],
    pointsOfInterest: [
      'Death Star Bar',
      'Death Star City',
      'Death Star Conference Room',
      'Detention Level',
      'Equatorial Trench',
      'Garbage Masher',
      'Mid-Hemisphere Trench',
      'Polar Trench',
      'Northan Polar Command Sector',
      'Overbridge'
    ]
  }
}
const typeObj = {
  'name': 'Data Types',
  'Infinity': Infinity,
  'NaN': Number.NaN,
  'Undefined': undefined,
  'Null': null,
  'Object': {foo: 'bar'},
  'Function': (size, toppings) => {},
  'Boolean': true,
  'Symbol': Symbol('Name of Symbol'),
  'Error': new Error('Error message text'),
  'Number': 42,
  'Date': new Date(),
  'String': 'The quick brown fox jumps over the lazy dog.',
  'RegExp': /a.long.regexp.that.keeps.giving/,
  'Array': [1, 2, 3],
  'Int8Array': new Int8Array(arrLen),
  'Uint8Array': new Uint8Array(arrLen),
  'Uint8ClampedArray': new Uint8ClampedArray(arrLen),
  'Int16Array': new Int16Array(arrLen),
  'Uint16Array': new Uint16Array(arrLen),
  'Int32Array': new Int32Array(arrLen),
  'Uint32Array': new Uint32Array(arrLen),
  'Float32Array': new Float32Array(arrLen),
  'Float64Array': new Float64Array(arrLen),
  'Map': new Map([['foo', 'bar']]),
  'Set': new Set([['foo', 'bar']]),
  'WeakMap': new WeakMap(),
  'WeakSet': new WeakSet(),
  'ArrayBuffer': new ArrayBuffer(arrLen),
  'SharedArrayBuffer': new SharedArrayBuffer(arrLen),
  'Atomics': Atomics,
  'DataView': new DataView(new ArrayBuffer(arrLen)),
  'Promise': Promise.resolve(),
  'Generator': (function * () {})(),
  'GeneratorFunction': function * (foo, bar) {},
  'AsyncFunction': async function (foo, bar) {}
}
module.exports = {
  msg: [
    'I’m sorry, Dave. I’m afraid I can’t do that.',
    'Where we’re going, we don’t need roads.',
    'No! Try not! Do or do not, there is no try.',
    'Wibbly wobbly timy wimy.',
    'I love deadlines. I love the whooshing noise they make as they go by.',
    'My name is Inigo Montoya. You killed my father. Prepare to die.',
    'You shall not pass.',
    'I\'ll be back.',
    'Luke, I AM your father.',
    'It\'s only a flesh wound.',
    'E.T. phone home.',
    'Get away from her, you bitch!',
    'Speak Friend and Enter.',
    'That\'s no moon. It\'s a space station.'
  ],
  deathStar,
  serenity,
  tardis,
  typeObj,
  data: [
    tardis,
    serenity,
    deathStar,
    typeObj
  ],
  dataSmall: tardis,
  dataMedium: serenity,
  dataLarge: deathStar,
  rndMsg () {
    return this.msg[Math.floor(Math.random() * this.msg.length)]
  },
  rndData () {
    return this.data[Math.floor(Math.random() * this.data.length)]
  }
}
