# `perj` Custom Logger `app` Example

This example shows how you could integrate `perj` into a simple web application running on [express.js](https://expressjs.com/).

## Modules

There are three files or modules that make up this example.

### `logger.js`

The `logger.js` module is the main application logger.
It is extending the `Perj` object to add functions specific to `Node.js` and `express`.

All log entries will have a `ver`, `host`, `pid`, and `name` properties.

The `child` function arguments have been extended to support a `module` argument. By calling `request('./logger').child(module, { foo: 'bar' })` it is easy to create child loggers that add extend the `name` top level property.

A `reqSerializer` function has been added to aid in serializing the `request` objects. By calling `log.info({ req })` you can log a slim version of the request object to the desired output.

### `auth.js`

This is a simple example of an `express` middleware function which will emit logs.

Notice how the local `log` variable is being set to a child logger and passing in the `Node.js` `module` object which will add the filename to the top level property `name`. The resulting name will be `app:auth` due to the `separatorString` option of the `perj` logger.

### `app.js`

This is the main entry point for the example application.

The `log` variable is being set by requiring the `logger.js` module.

The first function is used to log `request` objects. It is using the `logger.js` modules additional `reqSerializer` function to simplify the `request` objects.

## Expected Output

Below is the raw JSON output from launching the app and making a single GET request:

```js

{"level":"info","lvl":30,"ver":1,"host":"Dev","pid":10519,"name":"app","time":1527491388080,"msg":"Example app listening on port 3000!","data":""}
{"level":"info","lvl":30,"ver":1,"host":"Dev","pid":10519,"name":"app","time":1527491425582,"msg":"","data":{"req":{"method":"GET","url":"/","headers":{"host":"192.168.245.2:3000","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","accept-language":"en-US,en;q=0.5","accept-encoding":"gzip, deflate","connection":"keep-alive","upgrade-insecure-requests":"1","pragma":"no-cache","cache-control":"no-cache"}},"params":{},"query":{},"remoteAddress":"::ffff:192.168.245.1","remotePort":59889}}
{"level":"info","lvl":30,"ver":1,"host":"Dev","pid":10519,"name":"app:auth","file":"auth.js","time":1527491425583,"msg":"user authenticated","data":""}

```

Here is the same log messages in a human readable format:

```js

{
  level: 'info',
  lvl: 30,
  ver: 1,
  host: 'Dev',
  pid: 10519,
  name: 'app',
  time: 1527491388080,
  msg: 'Example app listening on port 3000!',
  data: ''
}

{
  level: 'info',
  lvl: 30,
  ver: 1,
  host: 'Dev',
  pid: 10519,
  name: 'app',
  time: 1527491425582,
  msg: '',
  data:{
    req: {
      method: 'GET',
      url: '/',
      headers:
        { host: '192.168.245.2:3000',
          'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
          accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.5',
          'accept-encoding': 'gzip, deflate',
          connection: 'keep-alive',
          'upgrade-insecure-requests': '1',
          pragma: 'no-cache',
          'cache-control': 'no-cache' },
      params: {},
      query: {},
      remoteAddress: '::ffff:192.168.245.1',
      remotePort: 59889 }
  }
}

{
  level: 'info',
  lvl: 30,
  ver: 1,
  host: 'Dev',
  pid: 10519,
  name: 'app:auth',
  file: 'auth.js',
  time: 1527491425583,
  msg: 'user authenticated',
  data: ''
}

```
