/*

Description:
This is a utility module to generate log data.

Platform:
- Node.js

Dependencies:
- perj
- data/index.js

Features:
- Generates a log entry every 'ms' in miliseconds.

*/

import Perj from '../src/perj.js';
import { hostname } from 'os';
import { basename } from 'path';
import { data } from '../data/index.js';

const host = hostname();
const pid = process.pid;
const file = basename(import.meta.url);
const name = 'Log Generator';
const log = new Perj({ host, pid, file, name });
const levels = Object.keys(log.levels);
const ms = 100;

/**
 * Generates a log entry at a random level.
 */
function genLog() {
  const level = getLevel();
  log[level](data.rndMsg(), data.rndData());
  setTimeout(genLog, ms);
}

/**
 * Selects a random log level.
 * @returns {string} A random log level.
 */
function getLevel() {
  return levels[Math.floor(Math.random() * levels.length)];
}

genLog();

