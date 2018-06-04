!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.perj=t():e.perj=t()}("undefined"==typeof self?this:self,function(){return function(e){function t(n){if(s[n])return s[n].exports;var i=s[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var s={};return t.m=e,t.c=s,t.d=function(e,s,n){t.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,s){if(1&s&&(e=t(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var i in e)t.d(n,i,function(t){return e[t]}.bind(null,i));return n},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e){e.exports=Object.freeze({epoch:()=>Date.now(),unix:()=>Math.round(Date.now()/1e3),iso:()=>'"'+(new Date).toISOString()+'"'})},function(e,t,s){const n=s(0);e.exports={levels:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},level:"info",levelKey:"level",levelKeyEnabled:!0,levelNumberKey:"lvl",levelNumberKeyEnabled:!0,dateTimeKey:"time",dateTimeFunction:n.epoch,messageKey:"msg",dataKey:"data",separatorString:":",serializers:!1,passThrough:!1,write:"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)?process.stdout.write.bind(process.stdout):console.log}},function(e){function t(e){return null==e?null:Object.getPrototypeOf(Object(e))}e.exports=function(e){const s=[];for(let n=t(e);n;)s.push(n),n=t(n);return s}},function(e,t,s){const n=s(2);e.exports=function(e={}){const t=n(e).filter(e=>e!==Object.prototype);return[e].concat(t).map(e=>Object.getOwnPropertyNames(e)).reduce((t,s)=>(s.forEach(s=>{t[s]=e[s]}),t),{})}},function(e){e.exports=function(e,s,n){!function e(s,n,i,o){let r;if("object"==typeof s&&null!==s){for(r=0;r<i.length;r++)if(i[r]===s)return o[n]="[Circular]",void t.push([o,n,s]);if(i.push(s),Array.isArray(s))for(r=0;r<s.length;r++)e(s[r],r,i,s);else{const t=Object.keys(s);for(r=0;r<t.length;r++){const n=t[r];e(s[n],n,i,s)}}i.pop()}}(e,"",[],void 0);const i=JSON.stringify(e,s,n);for(;0!==t.length;){const e=t.pop();e[0][e[1]]=e[2]}return i};const t=[]},function(e,t,s){const n=s(4),i=s(3),o=s(1),r=s(0),l=Symbol("SplitOptions"),h=Symbol("Options"),u=Symbol("TopSnip"),c=Symbol("TopValues"),f=Symbol("TopIsPrimitive"),a=Symbol("HeaderStrings"),p=Symbol("HeaderValues"),y=Symbol("SetLevelHeader"),d=Symbol("SetLevelFunction");e.exports=Object.freeze({Perj:class{constructor(e){for(const t in this[h]=Object.assign({},o),this[u]="",this[c]={},this[f]=!0,this[l](e),this[a]={},this[p]={},this[h].levels)this[y](t),this[d](t)}get level(){return this[h].level}set level(e){if(!this[h].levels.hasOwnProperty(e))throw new Error("The level option must be a valid key in the levels object.");this.hasOwnProperty(h)||(this[h]=Object.assign({},this[h])),this[h].level=e}get levels(){return this[h].levels}addLevel(e){for(const t in e)this[t]||(this[h].levels[t]=e[t],this[y](t),this[d](t))}get write(){return this[h].write}[l](e){if(e)for(const t in e)if(o.hasOwnProperty(t)){if("level"===t){this.level=e[t];continue}this[h][t]=e[t]}else{const s=typeof e[t];"string"==s?(this[u]+='"'+t+'":"'+e[t]+'",',this[c][t]=e[t]):"number"==s||"boolean"==s?(this[u]+='"'+t+'":'+e[t]+",",this[c][t]=e[t]):"undefined"==s?(this[u]+='"'+t+'":null,',this[c][t]=null):(this[u]+='"'+t+'":'+(n(e[t])||'""')+",",this[c][t]=e[t],this[f]=!1)}}[y](e){if(this[a][e]="{",this[h].levelKeyEnabled&&(this[a][e]+='"'+this[h].levelKey+'":"'+e+'",'),this[h].levelNumberKeyEnabled&&(this[a][e]+='"'+this[h].levelNumberKey+'":'+this[h].levels[e]+","),""!==this[u]&&(this[a][e]+=this[u]),this[a][e]+='"'+this[h].dateTimeKey+'":',this[h].passThrough){const t={};this[h].levelKeyEnabled&&(t[this[h].levelKey]=e),this[h].levelNumberKeyEnabled&&(t[this[h].levelNumberKey]=this[h].levels[e]),this[p][e]=Object.assign(t,this[c])}}[d](e){this[e]=function(...t){if(this[h].levels[this[h].level]>this[h].levels[e])return;const s=this[h].dateTimeFunction();let o="",r="",l='""';const u=e=>{if(!this[h].serializers)return e;if(null==e)return null;const t={};for(const s in e){let n=e[s];e.hasOwnProperty&&e.hasOwnProperty(s)&&this[h].serializers[s]&&(n=this[h].serializers[s](n)),void 0!==n&&(t[s]=n)}return t};if(1===t.length){const e=t[0];"string"==typeof e?(o=e,r=""):e instanceof Error?(o=e.message,r=i(e),l=n(r)):void 0===e?r=l=null:(r=u(e),l=n(r))}else if(1<t.length){r=[];for(const e of t){const t=typeof e;"string"!=t?"undefined"!=t?e instanceof Error?(r.push(i(e)),o||(o=e.message)):r.push(u(e)):r.push(null):o?r.push(e):o=e}1===r.length&&(r=r[0]),l=n(r)}const c=this[a][e]+s+',"'+this[h].messageKey+'":"'+o+'","'+this[h].dataKey+'":'+l+"}\n";if(this[h].passThrough){const t=Object.assign(this[p][e],{[this[h].dateTimeKey]:s,[this[h].messageKey]:o,[this[h].dataKey]:r});this[h].write(c,t)}else this[h].write(c)}}child(e){if(!e)throw new Error("Provide top level arguments to create a child logger.");const t=Object.create(this);if(this[f])for(const e in t[c]={},t[f]=!0,this[c])t[c][e]=this[c][e];else t[c]=Object.assign({},this[c]),t[f]=!1;for(const s in e){if(o.hasOwnProperty(s)||this[h].levelKey===s||this[h].levelNumberKey===s||this[h].dateTimeKey===s||this[h].messageKey===s||this[h].dataKey===s)continue;const n=typeof e[s];this[c].hasOwnProperty(s)&&"string"==typeof this[c][s]&&"string"==n?t[c][s]=this[c][s]+this[h].separatorString+e[s]:"undefined"==n?t[c][s]=null:(t[c][s]=e[s],"string"!=n&&"number"!=n&&"boolean"!=n&&(this[f]=!1))}for(const e in t[u]="",t[c])if(t[f]){const s=typeof t[c][e];"string"==s?t[u]+='"'+e+'":"'+t[c][e]+'",':("number"==s||"boolean"==s)&&(t[u]+='"'+e+'":'+t[c][e]+",")}else t[u]+='"'+e+'":'+(n(t[c][e])||'""')+",";for(const e in t.parent=this,t[a]={},t[p]={},this[h].levels)t[y](e);return t}stringify(e,t,s){return n(e,t,s)}json(e){console.log(n(e,null,2))}},dateTimeFunctions:r})}])});