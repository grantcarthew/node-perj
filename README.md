# perj

A fast, flexible JSON logger.

[![Maintainability][cc-maintain-badge]][cc-maintain-url]
[![Test Coverage][cc-coverage-badge]][cc-coverage-url]
[![Build Status][travisci-image]][travisci-url]
[![File Size][size-gzip-badge]][size-gzip-url]
[![NPM Version][npm-v-badge]][perj-npm]
[![js-standard-style][js-standard-image]][js-standard-url]
[![NSP Status][nsp-image]][nsp-url]
[![Patreon Donation][patreon-image]][patreon-url]
[![Twitter][twitter-badge]][twitter-url]

[![perj][perj-image]][perj-url]

## Installing

### Node.js

The [package.json](https://github.com/grantcarthew/node-perj/blob/master/package.json) has two configurations related to Node.js installations:

- `main`: points to the minified version compiled for v6.0.0 and above.
- `module`: points to the [src][perj-src] files. [Module field details](https://github.com/nodejs/node-eps/blob/4217dca299d89c8c18ac44c878b5fe9581974ef3/002-es6-modules.md#51-determining-if-source-is-an-es-module).

The [index.js](https://github.com/grantcarthew/node-perj/blob/master/index.js) points to the minified version compiled for v6.0.0 and above.

```sh

npm install --save perj

```

### Browser

Use the [dist][perj-dist] files or bundle from [src][perj-src].

| Type              | Size                                           | CDN                                        |
| ----------------- | ---------------------------------------------- | ------------------------------------------ |
| gzipped           | [![File Size][size-gzip-badge]][size-gzip-url] | https://unpkg.com/perj/dist/perj.min.js.gz |
| minified          | [![File Size][size-min-badge]][size-min-url]   | https://unpkg.com/perj/dist/perj.min.js    |
| full (source map) | [![File Size][size-full-badge]][size-full-url] | https://unpkg.com/perj/dist/perj.js        |

See [Unpkg](https://unpkg.com/) for fixed version options.

## Goals

- Designed to be integrated (DIY) ✔️
- Cross platform (Node.js and Browser) ✔️
- Flexible log and additional property options ✔️
- Fast ✔️

## Features

- No dependencies.
- Flexible API ([change almost everything][perj-options]).
- Flexible log methods:
  - Log items can be any number in any order of any type.
- The first string is nested under the 'msg' key:
  - First string includes a string argument or an Error message.
  - Additional string arguments are nested under the data key.
- Objects are nested under the 'data' key as an object or array of objects.
- Repeated string top level properties become [hierarchical][perj-separatorString].
- [Examples][perj-examples] to get you started.

## Quick Start

### Node.js Usage

The following example adds `ver`, `name`, `host`, `pid` and `file` top level property to the log output:

```js
const Perj = require("perj");

// Customize the variables below as needed. They are not required.
const ver = 1;
const name = "QuickStart";
const host = require("os").hostname();
const pid = process.pid;
const file = require("path").basename(module.filename, ".js");

const log = new Perj({ ver, name, host, pid, file });

log.info("the quick brown fox jumps over the lazy dog");

/*

The following string is sent to standard out:

{"level":"info","lvl":30,"ver":1,"name":"QuickStart","host":"Dev","pid":233241,"file":"quick-start","time":1526102959677,"msg":"the quick brown fox jumps over the lazy dog","data":""}

*/
```

### Browser Usage

The following example adds `ver`, `name`, and `host` top level property to the log entries:

```js
const Perj = require("perj");

// Customize the variables below as needed. They are not required.
const ver = 1;
const name = "QuickStart";
const host = location.hostname;

const log = new Perj({ ver, name, host });

log.info("the quick brown fox jumps over the lazy dog");

/*

The following string is sent to the console:

{"level":"info","lvl":30,"ver":1,"name":"QuickStart","host":"http://Dev","time":1526103303019,"msg":"the quick brown fox jumps over the lazy dog","data":""}

*/
```

## Documentation

For full documentation see the [Wiki][perj-wiki].

## About the Owner

I, Grant Carthew, am a technologist, trainer, and Dad from Queensland, Australia. I work on code in a number of personal projects and when the need arises I build my own packages.

This project exists because I was not happy with other logging packages.

Everything I do in open source is done in my own time and as a contribution to the open source community.

If you are using my projects and would like to thank me or support me, please click the Patreon link below.

[![Patreon Donation][patreon-image]][patreon-url]

See my [other projects on NPM](https://www.npmjs.com/~grantcarthew).

## Credit

This project only exists because it is standing on the shoulders of [GIANTS][pino-url].

Special thanks to the [guys](https://github.com/pinojs/pino/graphs/contributors) working on [pino][pino-url] being:

- [David Mark Clements](https://github.com/davidmarkclements)
- [Matteo Collina](https://github.com/mcollina)
- [James Sumners](https://github.com/jsumners)

A lot of the inspiration for `perj` came from the [pino][pino-url] package.

Not to mention the other packages and resources used to help develop on the Node.js platform.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

[travisci-image]: https://travis-ci.org/grantcarthew/node-perj.svg?branch=master
[travisci-url]: https://travis-ci.org/grantcarthew/node-perj
[cc-maintain-badge]: https://api.codeclimate.com/v1/badges/14946690a2410b71177e/maintainability
[cc-maintain-url]: https://codeclimate.com/github/grantcarthew/node-perj/maintainability
[cc-coverage-badge]: https://api.codeclimate.com/v1/badges/14946690a2410b71177e/test_coverage
[cc-coverage-url]: https://codeclimate.com/github/grantcarthew/node-perj/test_coverage
[npm-v-badge]: https://img.shields.io/npm/v/perj.svg
[size-gzip-badge]: https://img.shields.io/github/size/grantcarthew/node-perj/dist/perj.min.js.gz.svg
[size-gzip-url]: https://github.com/grantcarthew/node-perj/blob/master/dist/perj.min.js.gz
[size-min-badge]: https://img.shields.io/github/size/grantcarthew/node-perj/dist/perj.min.js.svg
[size-min-url]: https://github.com/grantcarthew/node-perj/blob/master/dist/perj.min.js
[size-full-badge]: https://img.shields.io/github/size/grantcarthew/node-perj/dist/perj.js.svg
[size-full-url]: https://github.com/grantcarthew/node-perj/blob/master/dist/perj.js
[js-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-url]: http://standardjs.com/
[nsp-image]: https://nodesecurity.io/orgs/openjs/projects/4367c7cb-163d-4335-be3c-fe3429c69385/badge
[nsp-url]: https://nodesecurity.io/orgs/openjs/projects/4367c7cb-163d-4335-be3c-fe3429c69385
[patreon-image]: https://img.shields.io/badge/patreon-donate-yellow.svg
[patreon-url]: https://www.patreon.com/grantcarthew
[twitter-badge]: https://img.shields.io/twitter/url/http/shields.io.svg?style=social
[twitter-url]: https://twitter.com/grantcarthew
[perj-image]: https://rawgit.com/grantcarthew/node-perj/master/perj.svg
[perj-url]: https://github.com/grantcarthew/node-perj
[perj-npm]: https://www.npmjs.com/package/perj
[perj-wiki]: https://github.com/grantcarthew/node-perj/wiki
[perj-src]: https://github.com/grantcarthew/node-perj/tree/master/src
[perj-dist]: https://github.com/grantcarthew/node-perj/tree/master/dist
[perj-options]: https://github.com/grantcarthew/node-perj/wiki/Options
[perj-separatorString]: https://github.com/grantcarthew/node-perj/wiki/separatorString
[perj-examples]: https://github.com/grantcarthew/node-perj/wiki/Examples
[pino-url]: https://www.npmjs.com/package/pino
