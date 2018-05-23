const perj = require('../perj')
const data = require('../data')

/*
Description:
A very slim single line console log output.

When to use:
Great for development if you don't like a noisy console.

Platform:
- Node.js
- Broswer

Dependencies:
- None

Features:
- Logs to the console only.
- Only time, level, and message displayed.
- No object or data displayed.
*/

const log = perj.create({ write })

function write (logString) {
  const item = JSON.parse(logString)
  const dt = new Date(item.time)
  const output = `[${dt.toISOString()}][${item.level}] ${item.msg}`
  console.log(output)
}

log.info(data.tardis)
log.info(data.rndMsg(), data.serenity)
log.info(data.rndMsg(), data.rndMsg(), data.deathStar)
log.info(data.rndMsg(), data.rndMsg(), data.tardis, data.serenity)

/*
Example console output:

[2018-05-03T01:31:31.464Z][info]
[2018-05-03T01:31:31.464Z][info] I'll be back.
[2018-05-03T01:31:31.464Z][info] I love deadlines. I love the whooshing noise they make as they go by.,You shall not pass.
[2018-05-03T01:31:31.464Z][info] It's only a flesh wound.,No! Try not! Do or do not, there is no try.

*/
