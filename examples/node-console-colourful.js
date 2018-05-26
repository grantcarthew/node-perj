const perj = require('../perj')
const chalk = require('chalk')
const colorize = require('json-colorizer')
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)
const name = 'full'
const data = require('../data')

/*
Description:
A full detail console log output including
colourful properties and formatted data.

When to use:
Great for development.

Platform:
- Node.js only due to 'os', 'path', 'chalk', and 'json-colorizer'.

Dependencies:
- chalk
- json-colorizer

Features:
- Logs colourful text to the console only.
- Logs time, level, name, host, pid, file, and message properties.
- Stringified objects displayed on next line in colour.
*/

const log = perj.create({ name, level: 'trace', write, host, pid, file })

function write (logString) {
  const item = JSON.parse(logString)
  const dt = chalk.magenta((new Date(item.time)).toISOString())
  const nameCol = chalk.magenta(item.name)
  let output = `[${dt}][${levelCol(item.level)}][${nameCol}](${item.host}:${item.pid}:${item.file}) ${item.msg}\n`
  output += colorize(JSON.stringify(item.data, null, 2))
  console.log(output)
}

function levelCol (level) {
  switch (level) {
    case 'fatal':
    case 'error':
      return chalk.red(level)
    case 'warn':
      return chalk.yellow(level)
    case 'info':
      return chalk.blue(level)
    case 'debug':
      return chalk.green(level)
    case 'trace':
      return chalk.cyan(level)
  }
  return level
}

log.info(data.tardis)
log.error(data.rndMsg(), data.serenity)
log.debug(data.rndMsg(), data.rndMsg(), data.deathStar)
log.warn(data.rndMsg(), data.rndMsg(), data.tardis, data.serenity)

/*
Example console output (colour not visible here):

[2018-05-03T05:17:14.935Z][info][full](Dev:7367:console-colourful.js)
{
  "name": "TARDIS",
  "class": "Time and Relative Dimension in Space",
  "modelType": 40,
  "manufacturer": "Gallifrey",
  "features": [
    "Bigger on the inside",
    "Space Transport",
    "Time Travel"
  ],
  "exterior": {
    "policeBox": [
      "1963",
      "1966",
      "1976",
      "1980",
      "1996",
      "2005",
      "2010",
      "2014"
    ],
    "car": "Bessie"
  }
}
[2018-05-03T05:17:14.938Z][error][full](Dev:7367:console-colourful.js) wibbly wobbly timy wimy.
{
  "url": "https://en.wikipedia.org/wiki/Serenity_(Firefly_vessel)",
  "class": "Firefly-Class Transport Ship",
  "classCode": "03-K64",
  "model": "aught three",
  "designDate": "August 2459",
  "technicalSpecifications": {
    "lengthInMeters": 82,
    "beamInMeters": 52,
    "heightInMeters": 24,
    "curbWeightInKg": 128100,
    "cargoCapacityInKg": 748000,
    "personnelCapacity": 18,
    "maxAcceleration": "4.2g",
    "rangeInAstronomicalUnits": 440
  },
  "interior": {
    "upperDeck": [
      "Bridge",
      "Corridor",
      "Airlock",
      "Galley",
      "Engine Room"
    ],
    "lowerDeck": [
      "Main Airlock",
      "Cargo Bay",
      "Common Area",
      "Infirmary",
      "Passenger Quarters"
    ]
  },
  "engine": "Standard Radion-Accelerator Core",
  "armament": null,
  "defense": "Crybabies - decoy buoys used to mimic other ships",
  "primaryFeature": "Fast"
}
[2018-05-03T05:17:14.938Z][debug][full](Dev:7367:console-colourful.js) wibbly wobbly timy wimy.,I'll be back.
{
  "url": "http://starwars.wikia.com/wiki/DS-1_Orbital_Battle_Station",
  "production": {
    "model": "DS-1 Orbital Battle Station",
    "manufacturer": [
      "Advanced Weapons Researce",
      "Kuat Drive Yards",
      "Sienar Fleet Systems"
    ],
    "designer": [
      "Geonosians",
      "Stalgasin Hive",
      "Project Celestial Power",
      "Galen Walton Erso"
    ],
    "class": "Space Battle Station",
    "cost": 1000000000000
  },
  "specifications": {
    "widthInKm": "160",
    "hyperdriveRating": [
      "Class 4",
      "Class 20 (backup)"
    ],
    "powerPlant": "Hpermatter Reactor",
    "armament": [
      "Mk 1 Superlaser",
      "Tractor Beam Emplaceements",
      "Turbolaser Batteries (15,000)",
      "Super Blaster 920 Laser Cannons (2,500)",
      "Ion Cannons (2,500)"
    ],
    "complement": "TIE / In Space Superiority Starfighters (7,200)",
    "crew": {
      "personnel": "1,186,295 - 1,206,293",
      "imperialNavyAndArmy": 342953,
      "stormtroopers": 25984
    },
    "cargoCapacityInKilotons": 1000000,
    "consumables": "Three Standard Years",
    "communicationSystems": "Equipped",
    "otherSystems": [
      "High-speed, officer-use shuttle system",
      "Emergency-use Life Support Modules"
    ]
  },
  "locationInformation": {
    "planet": [
      "Geonosis",
      "Scarif",
      "Alderaan",
      "Yavin"
    ]
  },
  "usage": {
    "roles": "Planet-destroying Battle Station",
    "affiliation": [
      "Confederacy of Independent Systems",
      "Galactic Republic",
      "Galactic Empire Imperial Navy"
    ],
    "constructed": [
      "Phase one completed in 21 BBY",
      "Completed in 0 BBY"
    ],
    "destroyed": "0 BBY during the Battle of Yarvin",
    "battles": [
      "Destruction of Jedha City",
      "Battle of Scarif",
      "The Disaster",
      "Rescue of Princess Leia",
      "Battle of Yavin"
    ],
    "crewmembers": [
      "Shann Childsen",
      "Thane Kyrell",
      "Conan Antonio Matti",
      "MSE-6-G735Y",
      "Pamel Poul",
      "TK-421",
      "TK-450",
      "Wullf Yularen"
    ],
    "commanders": [
      "Director Orson Callan Krennic",
      "Grand Moff Wilhuff Tarkin"
    ],
    "aliases": [
      "DS-1 Platform",
      "Sentinel Base",
      "Ultimate Weapon"
    ],
    "pointsOfInterest": [
      "Death Star Bar",
      "Death Star City",
      "Death Star Conference Room",
      "Detention Level",
      "Equatorial Trench",
      "Garbage Masher",
      "Mid-Hemisphere Trench",
      "Polar Trench",
      "Northan Polar Command Sector",
      "Overbridge"
    ]
  }
}
[2018-05-03T05:17:14.940Z][warn][full](Dev:7367:console-colourful.js) I'll be back.,It's only a flesh wound.
[
  {
    "name": "TARDIS",
    "class": "Time and Relative Dimension in Space",
    "modelType": 40,
    "manufacturer": "Gallifrey",
    "features": [
      "Bigger on the inside",
      "Space Transport",
      "Time Travel"
    ],
    "exterior": {
      "policeBox": [
        "1963",
        "1966",
        "1976",
        "1980",
        "1996",
        "2005",
        "2010",
        "2014"
      ],
      "car": "Bessie"
    }
  },
  {
    "url": "https://en.wikipedia.org/wiki/Serenity_(Firefly_vessel)",
    "class": "Firefly-Class Transport Ship",
    "classCode": "03-K64",
    "model": "aught three",
    "designDate": "August 2459",
    "technicalSpecifications": {
      "lengthInMeters": 82,
      "beamInMeters": 52,
      "heightInMeters": 24,
      "curbWeightInKg": 128100,
      "cargoCapacityInKg": 748000,
      "personnelCapacity": 18,
      "maxAcceleration": "4.2g",
      "rangeInAstronomicalUnits": 440
    },
    "interior": {
      "upperDeck": [
        "Bridge",
        "Corridor",
        "Airlock",
        "Galley",
        "Engine Room"
      ],
      "lowerDeck": [
        "Main Airlock",
        "Cargo Bay",
        "Common Area",
        "Infirmary",
        "Passenger Quarters"
      ]
    },
    "engine": "Standard Radion-Accelerator Core",
    "armament": null,
    "defense": "Crybabies - decoy buoys used to mimic other ships",
    "primaryFeature": "Fast"
  }
]

*/
