import consoleProbe from "console-probe";
consoleProbe.apply();
import Perj from "../dist/perj.js";
import * as P from "../dist/perj.js";
import { data } from "../data/index.js";
// const log = new Perj();
// const child = log.child({ child: true });
// console.probe(child);
// console.dir(P);
// log.info("This is a data object", data);

import { log } from "../examples/browser-simple.js";
log.info("Example: browser-simple");
