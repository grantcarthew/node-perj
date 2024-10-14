import consoleProbe from "console-probe";
consoleProbe.apply();
import { Perj } from "../src/perj.js";
const log = new Perj();
const child = log.child({ child: true });
console.probe(child);
