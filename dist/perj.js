!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("./../node_modules/process/browser.js")):"function"==typeof define&&define.amd?define(["./../node_modules/process/browser.js"],t):"object"==typeof exports?exports.perj=t(require("./../node_modules/process/browser.js")):e.perj=t(e["./../node_modules/process/browser.js"])}("undefined"==typeof self?this:self,function(e){return function(e){function t(o){if(s[o])return s[o].exports;var i=s[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var s={};return t.m=e,t.c=s,t.d=function(e,s,o){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e){e.exports=Object.freeze({epoch:()=>Date.now(),unix:()=>Math.round(Date.now()/1e3),iso:()=>'"'+(new Date).toISOString()+'"'})},function(t){t.exports=e},function(e,t,s){(function(t){const o=s(0);e.exports={levels:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},level:"info",levelKey:"level",levelNumberKey:"lvl",dateTimeKey:"time",dateTimeFunction:o.epoch,messageKey:"msg",dataKey:"data",separatorString:":",passThrough:!1,write:"[object process]"===Object.prototype.toString.call(t)?t.stdout.write.bind(t.stdout):console.log}}).call(this,s(1))},function(e){function t(e){return null==e?null:Object.getPrototypeOf(Object(e))}e.exports=function(e){const s=[];for(let o=t(e);o;)s.push(o),o=t(o);return s}},function(e,t,s){const o=s(3);e.exports=function(e={}){const t=o(e).filter(e=>e!==Object.prototype);return[e].concat(t).map(e=>Object.getOwnPropertyNames(e)).reduce((t,s)=>(s.forEach(s=>{t[s]=e[s]}),t),{})}},function(e){e.exports=function(e,s,o){!function e(s,o,i,n){let r;if("object"==typeof s&&null!==s){for(r=0;r<i.length;r++)if(i[r]===s)return n[o]="[Circular]",void t.push([n,o,s]);if(i.push(s),Array.isArray(s))for(r=0;r<s.length;r++)e(s[r],r,i,s);else{const t=Object.keys(s);for(r=0;r<t.length;r++){const o=t[r];e(s[o],o,i,s)}}i.pop()}}(e,"",[],void 0);const i=JSON.stringify(e,s,o);for(;0!==t.length;){const e=t.pop();e[0][e[1]]=e[2]}return i};const t=[]},function(e,t,s){const o=s(5),i=s(4),n=s(2),r=s(0),l=Symbol("SplitOptions"),h=Symbol("Options"),c=Symbol("TopSnip"),u=Symbol("TopValues"),a=Symbol("TopIsPrimitive"),f=Symbol("HeaderStrings"),p=Symbol("HeaderValues"),y=Symbol("SetLevelHeader"),d=Symbol("SetLevelFunction");e.exports=Object.freeze({create:e=>new class{constructor(e){for(const t in this[h]=Object.assign({},n),this[c]="",this[u]={},this[a]=!0,this[l](e),this[f]={},this[p]={},this[h].levels)this[y](t),this[d](t)}get level(){return this[h].level}set level(e){if(!this[h].levels.hasOwnProperty(e))throw new Error("The level option must be a valid key in the levels object.");this.hasOwnProperty(h)||(this[h]=Object.assign({},this[h])),this[h].level=e}get levels(){return this[h].levels}addLevel(e){for(const t in e)this[t]||(this[h].levels[t]=e[t],this[y](t),this[d](t))}get write(){return this[h].write}[l](e){if(e)for(const t in e)if(n.hasOwnProperty(t)){if("level"===t){this.level=e[t];continue}this[h][t]=e[t]}else{const s=typeof e[t];"string"==s?(this[c]+=',"'+t+'":"'+e[t]+'"',this[u][t]=e[t]):"number"==s||"boolean"==s?(this[c]+=',"'+t+'":'+e[t],this[u][t]=e[t]):(this[c]+=',"'+t+'":'+(o(e[t])||'""'),this[u][t]=e[t],this[a]=!1)}}[y](e){this[f][e]='{"'+this[h].levelKey+'":"'+e+'","'+this[h].levelNumberKey+'":'+this[h].levels[e]+this[c]+',"'+this[h].dateTimeKey+'":',this[h].passThrough&&(this[p][e]=Object.assign({[this[h].levelKey]:e,[this[h].levelNumberKey]:this[h].levels[e]},this[u]))}[d](e){this[e]=function(...t){if(this[h].levels[this[h].level]>this[h].levels[e])return;const s=this[h].dateTimeFunction();let n="",r=[],l="";if(1===t.length){const e=t[0];"string"==typeof e?(n=e,l='""'):e instanceof Error?(n=e.message,r=i(e),l=o(r)):(r=e,l=o(e))}else if(1>t.length)l='""';else{for(const e of t)"string"!=typeof e?e instanceof Error?(r.push(i(e)),n||(n=e.message)):r.push(e):n?r.push(e):n=e;1===r.length&&(r=r[0]),l=o(r)}const c=this[f][e]+s+',"'+this[h].messageKey+'":"'+n+'","'+this[h].dataKey+'":'+l+"}\n";if(this[h].passThrough){const t=Object.assign(this[p][e],{[this[h].dateTimeKey]:s,[this[h].messageKey]:n,[this[h].dataKey]:r});this[h].write(c,t)}else this[h].write(c)}}child(e){if(!e)throw new Error("Provide top level arguments to create a child logger.");const t=Object.create(this);if(this[a])for(const e in t[u]={},t[a]=!0,this[u])t[u][e]=this[u][e];else t[u]=Object.assign({},this[u]),t[a]=!1;for(const s in e){if(n.hasOwnProperty(s)||this[h].levelKey===s||this[h].levelNumberKey===s||this[h].dateTimeKey===s||this[h].messageKey===s||this[h].dataKey===s)continue;const o=typeof e[s];this[u].hasOwnProperty(s)&&"string"==typeof this[u][s]&&"string"==o?t[u][s]=this[u][s]+this[h].separatorString+e[s]:(t[u][s]=e[s],"string"!=o&&"number"!=o&&"boolean"!=o&&(this[a]=!1))}for(const e in t[c]="",t[u])if(t[a]){const s=typeof t[u][e];"string"==s?t[c]+=',"'+e+'":"'+t[u][e]+'"':("number"==s||"boolean"==s)&&(t[c]+=',"'+e+'":'+t[u][e])}else t[c]+=',"'+e+'":'+(o(t[u][e])||'""');for(const e in t.parent=this,t[f]={},this[h].levels)t[y](e);return t}stringify(e,t,s){return o(e,t,s)}json(e){console.log(o(e,null,2))}}(e),dateTimeFunctions:r})}])});