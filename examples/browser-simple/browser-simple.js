import Perj from "https://unpkg.com/perj/dist/perj.js"
const ver = 1;
const name = "Your App Name"; // <======= CHANGE THIS NAME
const host = location.hostname;

export default new Perj({ ver, name, host });

// Add a 'write' function to send to a SaaS provider