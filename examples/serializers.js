/*

Description:
A simple example to show how serializers work.

Platform:
- Node.js due to 'request' and 'response' object.

Dependencies:
- perj

Features:
- Simplify the logging of the 'request' object.
- Simplify the logging of the 'response' object.

Usage:
- Copy and paste the code into your application.
- Customize as needed.
- Serializers need to be registered under the key name they serialize.
- Logging objects need to be nested under the serializer key name.

Suggestions:
- Make your own serializer by using the below as an example.

Performance:
- n/a

*/

const Perj = require('perj')
const log = new Perj({ serializers: { req: reqSerializer, res: resSerializer } })

function reqSerializer (value) {
  const { method, url, headers, params, query, connection } = value
  const remoteAddress = connection && connection.remoteAddress
  const remotePort = connection && connection.remotePort
  return { method, url, headers, params, query, remoteAddress, remotePort }
}

function resSerializer (value) {
  const { statusCode, _headerSent: headerSent } = value
  return { statusCode, headerSent }
}

/*
In your application server code:

log.info({ req }, { res })

standard output will look something like:

{"level":"info","lvl":30,"time":1528086780918,"msg":"","data":{"req":{"method":"GET","url":"/stylesheets/style.css","headers":{"host":"192.168.245.2:3000","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0","accept":"text/css,/*;q=0.1","accept-language":"en-US,en;q=0.5","accept-encoding":"gzip, deflate","referer":"http://192.168.245.2:3000/","connection":"keep-alive","if-modified-since":"Mon, 04 Jun 2018 02:54:19 GMT","if-none-match":"W/\"6f-163c8b77f9c\"","cache-control":"max-age=0"},"params":{},"query":{},"remoteAddress":"::ffff:192.168.245.1","remotePort":64682}}}
{"level":"info","lvl":30,"time":1528086780918,"msg":"","data":{"res":{"statusCode":200,"headerSent":false}}}

*/
