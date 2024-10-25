#!/usr/bin/env node

import colourful from "./node-colourful.js";
import file from "./node-file.js";
import simple from "./node-simple.js"
import path from 'path';
import { data } from "../data/index.js";
import { fileURLToPath } from 'url';


// Determine the directory of the current script
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


console.log('===================')
console.log('COLOURFUL EXAMPLE')
console.log('===================')
colourful.level = "trace";
colourful.info("colourful", data.tardis);
colourful.warn("colourful");
colourful.debug("colourful");
colourful.trace("colourful");
colourful.error("colourful");
colourful.fatal("colourful");

console.log('==============')
console.log('FILE EXAMPLE')
console.log('==============')
file.info("file", data.tardis);

console.log('================')
console.log('SIMPLE EXAMPLE')
console.log('================')
simple.info("file", data.tardis);
