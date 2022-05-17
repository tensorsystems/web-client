"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r,n=t(e),a={exports:{}};
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
r=a,function(){var e={}.hasOwnProperty;function t(){for(var r=[],n=0;n<arguments.length;n++){var a=arguments[n];if(a){var o=typeof a;if("string"===o||"number"===o)r.push(a);else if(Array.isArray(a)){if(a.length){var u=t.apply(null,a);u&&r.push(u)}}else if("object"===o)if(a.toString===Object.prototype.toString)for(var l in a)e.call(a,l)&&a[l]&&r.push(l);else r.push(a.toString())}}return r.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t}();var o=a.exports;exports.SideNav=function(t){var r=t.tabs,a=t.onSelect,u=e.useState(0),l=u[0],s=u[1];return n.default.createElement("div",{className:"bg-white w-60 rounded-lg pt-2 pb-2 pl-3 pr-3"},r.map((function(e,t){return n.default.createElement("div",{key:t,className:o("p-3 rounded-md",{"bg-gray-100":l===t})},n.default.createElement("button",{className:o("font-medium font-sans w-full text-left focus:outline-none",{"text-gray-800":l===t,"text-gray-600":l!==t}),onClick:function(){s(t),a(t)}},e))})))};
//# sourceMappingURL=index.js.map
