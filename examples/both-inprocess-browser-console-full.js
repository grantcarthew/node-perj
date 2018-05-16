// To test on Node.js, uncomment these lines.
// let location = {}
// location.hostname = 'http://abc.net'
const perj = require('../perj')
const name = 'full'
const host = location.hostname
const scifi = require('../data-scifi')

/*
Description:
A full detail console log output including formatted data.

When to use:
Great for development or production.

Platform:
- Browser only due to location.hostname

Dependencies:
- None

Features:
- Logs to the console only.
- Logs time, level, name, host, and message properties.
- Stringified objects displayed on next line.
*/

const log = perj.create({ name, write, host })

function write (logString) {
  const item = JSON.parse(logString)
  const dt = new Date(item.time)
  let output = `[${dt.toISOString()}][${item.level}][${item.name}](${item.host}) ${item.msg}\n`
  output += JSON.stringify(item.data, null, 2)
  console.log(output)
}

log.info(scifi.tardis)
log.info(scifi.rndMsg(), scifi.serenity)
log.info(scifi.rndMsg(), scifi.rndMsg(), scifi.deathStar)
log.info(scifi.rndMsg(), scifi.rndMsg(), scifi.tardis, scifi.serenity)

/*
Example console output:

[2018-05-03T02:46:54.611Z][info][full](Dev:7094:console-full.js)
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
[2018-05-03T02:46:54.613Z][info][full](Dev:7094:console-full.js) No! Try not! Do or do not, there is no try.
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
[2018-05-03T02:46:54.613Z][info][full](Dev:7094:console-full.js) I’m sorry, Dave. I’m afraid I can’t do that.,My name is Inigo Montoya. You killed my father. Prepare to die.
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
[2018-05-03T02:46:54.614Z][info][full](Dev:7094:console-full.js) E.T. phone home.,Speak Friend and Enter.
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
