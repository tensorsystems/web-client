import e,{useState as t}from"react";var r,n={exports:{}};
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/r=n,function(){var e={}.hasOwnProperty;function t(){for(var r=[],n=0;n<arguments.length;n++){var o=arguments[n];if(o){var a=typeof o;if("string"===a||"number"===a)r.push(o);else if(Array.isArray(o)){if(o.length){var s=t.apply(null,o);s&&r.push(s)}}else if("object"===a)if(o.toString===Object.prototype.toString)for(var i in o)e.call(o,i)&&o[i]&&r.push(i);else r.push(o.toString())}}return r.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t}();var o=n.exports,a=function(r){var n=r.tabs,a=r.onSelect,s=t(0),i=s[0],l=s[1];return e.createElement("div",{className:"bg-white w-60 rounded-lg pt-2 pb-2 pl-3 pr-3"},n.map((function(t,r){return e.createElement("div",{key:r,className:o("p-3 rounded-md",{"bg-gray-100":i===r})},e.createElement("button",{className:o("font-medium font-sans w-full text-left focus:outline-none",{"text-gray-800":i===r,"text-gray-600":i!==r}),onClick:function(){l(r),a(r)}},t))})))};export{a as SideNav};
//# sourceMappingURL=index.js.map
