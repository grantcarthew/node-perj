// const split = require('split2')
const pump = require('pump')
// const fs = require('fs')
// const through = require('through2')
const fsr = require('file-stream-rotator')

// const myTransport = through.obj(function (chunk, enc, cb) {
//   // do whatever you want here!
//   console.log(chunk)
//   cb()
// })

// pump(process.stdin, split(JSON.parse), myTransport)

const source = process.stdin
const dest = fsr.getStream({ filename: 'app.log', frequency: 'daily', size: '1m', verbose: true })
// const dest = fs.createWriteStream('app.log')

pump(source, dest, function (err) {
  console.log('pipe finished', err)
})

// setTimeout(function() {
//   dest.destroy() // when dest is closed pump will destroy source
// }, 1000)
/*
pipe finished undefined
events.js:167
      throw er; // Unhandled 'error' event
      ^

Error: write EPIPE
    at WriteWrap.afterWrite [as oncomplete] (net.js:835:14)
Emitted 'error' event at:
    at onwriteError (_stream_writable.js:434:12)
    at onwrite (_stream_writable.js:459:5)
    at _destroy (internal/streams/destroy.js:40:7)
    at Socket.stdout._destroy (internal/process/stdio.js:24:7)
    at Socket.destroy (internal/streams/destroy.js:32:8)
    at WriteWrap.afterWrite [as oncomplete] (net.js:837:10)
grant@Dev:~/node-perj/examples$
*/
