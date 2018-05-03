const jrep = require('../jrep')
const scifi = require('../data-scifi')

/*
Description:
A very simple single line console log output.

When to use:
Great for development if you don't like a noisy console.

Dependencies:
- None

Features:
- Logs to the console only
- Only level, time, and message displayed
- No object or data displayed
*/

const stream = {
  write (entry) {
    console.log(entry)
    const item = JSON.parse(entry)
    const dt = new Date(item.time)
    const output = `[${item.level}][${dt.toISOString()}] ${item.msg}`
    console.log(output)
  }
}

const log = jrep.create({ stream })

log.info(scifi.tardis)
log.info(scifi.rndMsg(), scifi.serenity)
log.info(scifi.rndMsg(), scifi.rndMsg(), scifi.deathStar)
log.info(scifi.rndMsg(), scifi.rndMsg(), scifi.tardis, scifi.serenity)

/*
Example console output:

[info][2018-05-02T23:36:59.422Z]
[info][2018-05-02T23:36:59.425Z] You shall not pass.
[info][2018-05-02T23:36:59.425Z] It's only a flesh wound.,No! Try not! Do or do not, there is no try.

*/
