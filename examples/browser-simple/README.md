# Perj Browser Simple Example

A full detail console log output including formatted data.

- Platform: Browser only due to 'location.hostname'.
- Dependencies: perj

Features:

- Logs to the console only.
- Logs JSON strings only.
- Logs ver, name, and host extra properties.

Usage:

- Change the value of the 'name' variable.
- Launch a web server from this directory.
- Open http://localhost:<your-port>/
- Customize as needed.

Comment:

To test on Node.js, add these lines:

```js
const location = {}
location.hostname = 'http://abc.net'
```

Example console output:
```json
{"level":"info","lvl":30,"ver":1,"name":"Your App Name","host":"127.0.0.1","time":1729821752391,"msg":"Logging initialized","data":{"foo":"bar"}}
```