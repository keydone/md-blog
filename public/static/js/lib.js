/*! art-template@4.13.1 for browser | https://github.com/aui/art-template */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.template=t():e.template=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";var r=n(6),i=n(2),o=n(22),s=function(e,t){t.onerror(e,t);var n=function(){return"{Template Error}"};return n.mappings=[],n.sourcesContent=[],n},a=function u(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};"string"!=typeof e?t=e:t.source=e,t=i.$extend(t),e=t.source,!0===t.debug&&(t.cache=!1,t.minimize=!1,t.compileDebug=!0),t.compileDebug&&(t.minimize=!1),t.filename&&(t.filename=t.resolveFilename(t.filename,t));var n=t.filename,a=t.cache,c=t.caches;if(a&&n){var l=c.get(n);if(l)return l}if(!e)try{e=t.loader(n,t),t.source=e}catch(m){var f=new o({name:"CompileError",path:n,message:"template not found: "+m.message,stack:m.stack});if(t.bail)throw f;return s(f,t)}var p=void 0,h=new r(t);try{p=h.build()}catch(f){if(f=new o(f),t.bail)throw f;return s(f,t)}var d=function(e,n){try{return p(e,n)}catch(f){if(!t.compileDebug)return t.cache=!1,t.compileDebug=!0,u(t)(e,n);if(f=new o(f),t.bail)throw f;return s(f,t)()}};return d.mappings=p.mappings,d.sourcesContent=p.sourcesContent,d.toString=function(){return p.toString()},a&&n&&c.set(n,d),d};a.Compiler=r,e.exports=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,t.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t}},function(e,t,n){"use strict";function r(){this.$extend=function(e){return e=e||{},o(e,e instanceof r?e:this)}}var i=n(10),o=n(12),s=n(13),a=n(14),u=n(15),c=n(16),l=n(17),f=n(18),p=n(19),h=n(21),d="undefined"==typeof window,m={source:null,filename:null,rules:[f,l],escape:!0,debug:!!d&&"production"!==process.env.NODE_ENV,bail:!0,cache:!0,minimize:!0,compileDebug:!1,resolveFilename:h,include:s,htmlMinifier:p,htmlMinifierOptions:{collapseWhitespace:!0,minifyCSS:!0,minifyJS:!0,ignoreCustomFragments:[]},onerror:a,loader:c,caches:u,root:"/",extname:".art",ignore:[],imports:i};r.prototype=m,e.exports=new r},function(e,t){},function(e,t,n){"use strict";var r=n(5),i=n(0),o=n(23),s=function(e,t){return t instanceof Object?r({filename:e},t):i({filename:e,source:t})};s.render=r,s.compile=i,s.defaults=o,e.exports=s},function(e,t,n){"use strict";var r=n(0),i=function(e,t,n){return r(e,n)(t)};e.exports=i},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7),u=n(9),c="$data",l="$imports",f="print",p="include",h="extend",d="block",m="$$out",v="$$line",g="$$blocks",y="$$slice",b="$$from",w="$$options",x=function(e,t){return Object.hasOwnProperty.call(e,t)},k=JSON.stringify,E=function(){function e(t){var n,s,a=this;o(this,e);var x=t.source,k=t.minimize,E=t.htmlMinifier;if(this.options=t,this.stacks=[],this.context=[],this.scripts=[],this.CONTEXT_MAP={},this.ignore=[c,l,w].concat(i(t.ignore)),this.internal=(n={},r(n,m,"''"),r(n,v,"[0,0]"),r(n,g,"arguments[1]||{}"),r(n,b,"null"),r(n,f,"function(){var s=''.concat.apply('',arguments);"+m+"+=s;return s}"),r(n,p,"function(src,data){var s="+w+".include(src,data||"+c+",arguments[2]||"+g+","+w+");"+m+"+=s;return s}"),r(n,h,"function(from){"+b+"=from}"),r(n,y,"function(c,p,s){p="+m+";"+m+"='';c();s="+m+";"+m+"=p+s;return s}"),r(n,d,"function(){var a=arguments,s;if(typeof a[0]==='function'){return "+y+"(a[0])}else if("+b+"){if(!"+g+"[a[0]]){"+g+"[a[0]]="+y+"(a[1])}else{"+m+"+="+g+"[a[0]]}}else{s="+g+"[a[0]];if(typeof s==='string'){"+m+"+=s}else{s="+y+"(a[1])}return s}}"),n),this.dependencies=(s={},r(s,f,[m]),r(s,p,[m,w,c,g]),r(s,h,[b,p]),r(s,d,[y,b,m,g]),s),this.importContext(m),t.compileDebug&&this.importContext(v),k)try{x=E(x,t)}catch(T){}this.source=x,this.getTplTokens(x,t.rules,this).forEach(function(e){e.type===u.TYPE_STRING?a.parseString(e):a.parseExpression(e)})}return s(e,[{key:"getTplTokens",value:function(){return u.apply(undefined,arguments)}},{key:"getEsTokens",value:function(e){return a(e)}},{key:"getVariables",value:function(e){var t=!1;return e.filter(function(e){return"whitespace"!==e.type&&"comment"!==e.type}).filter(function(e){return"name"===e.type&&!t||(t="punctuator"===e.type&&"."===e.value,!1)}).map(function(e){return e.value})}},{key:"importContext",value:function(e){var t=this,n="",r=this.internal,i=this.dependencies,o=this.ignore,s=this.context,a=this.options,u=a.imports,f=this.CONTEXT_MAP;x(f,e)||-1!==o.indexOf(e)||(x(r,e)?(n=r[e],x(i,e)&&i[e].forEach(function(e){return t.importContext(e)})):n="$escape"===e||"$each"===e||x(u,e)?l+"."+e:c+"."+e,f[e]=n,s.push({name:e,value:n}))}},{key:"parseString",value:function(e){var t=e.value;if(t){var n=m+"+="+k(t);this.scripts.push({source:t,tplToken:e,code:n})}}},{key:"parseExpression",value:function(e){var t=this,n=e.value,r=e.script,i=r.output,o=this.options.escape,s=r.code;i&&(s=!1===o||i===u.TYPE_RAW?m+"+="+r.code:m+"+=$escape("+r.code+")");var a=this.getEsTokens(s);this.getVariables(a).forEach(function(e){return t.importContext(e)}),this.scripts.push({source:n,tplToken:e,code:s})}},{key:"checkExpression",value:function(e){for(var t=[[/^\s*}[\w\W]*?{?[\s;]*$/,""],[/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,"$1})"],[/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,"$1}"]],n=0;n<t.length;){if(t[n][0].test(e)){var r;e=(r=e).replace.apply(r,i(t[n]));break}n++}try{return new Function(e),!0}catch(o){return!1}}},{key:"build",value:function(){var e=this.options,t=this.context,n=this.scripts,r=this.stacks,i=this.source,o=e.filename,s=e.imports,a=[],f=x(this.CONTEXT_MAP,h),d=0,y=function(e,t){var n=t.line,i=t.start,o={generated:{line:r.length+d+1,column:1},original:{line:n+1,column:i+1}};return d+=e.split(/\n/).length-1,o},E=function(e){return e.replace(/^[\t ]+|[\t ]$/g,"")};r.push("function("+c+"){"),r.push("'use strict'"),r.push(c+"="+c+"||{}"),r.push("var "+t.map(function(e){return e.name+"="+e.value}).join(",")),e.compileDebug?(r.push("try{"),n.forEach(function(e){e.tplToken.type===u.TYPE_EXPRESSION&&r.push(v+"=["+[e.tplToken.line,e.tplToken.start].join(",")+"]"),a.push(y(e.code,e.tplToken)),r.push(E(e.code))}),r.push("}catch(error){"),r.push("throw {"+["name:'RuntimeError'","path:"+k(o),"message:error.message","line:"+v+"[0]+1","column:"+v+"[1]+1","source:"+k(i),"stack:error.stack"].join(",")+"}"),r.push("}")):n.forEach(function(e){a.push(y(e.code,e.tplToken)),r.push(E(e.code))}),f&&(r.push(m+"=''"),r.push(p+"("+b+","+c+","+g+")")),r.push("return "+m),r.push("}");var T=r.join("\n");try{var O=new Function(l,w,"return "+T)(s,e);return O.mappings=a,O.sourcesContent=[i],O}catch(P){for(var $=0,j=0,_=0,S=void 0;$<n.length;){var C=n[$];if(!this.checkExpression(C.code)){j=C.tplToken.line,_=C.tplToken.start,S=C.code;break}$++}throw{name:"CompileError",path:o,message:P.message,line:j+1,column:_+1,source:i,generated:S,stack:P.stack}}}}]),e}();E.CONSTS={DATA:c,IMPORTS:l,PRINT:f,INCLUDE:p,EXTEND:h,BLOCK:d,OPTIONS:w,OUT:m,LINE:v,BLOCKS:g,SLICE:y,FROM:b,ESCAPE:"$escape",EACH:"$each"},e.exports=E},function(e,t,n){"use strict";var r=n(8),i=n(1)["default"],o=n(1).matchToToken,s=function(e){return e.match(i).map(function(e){return i.lastIndex=0,o(i.exec(e))}).map(function(e){return"name"===e.type&&r(e.value)&&(e.type="keyword"),e})};e.exports=s},function(e,t,n){"use strict";var r={"abstract":!0,await:!0,"boolean":!0,"break":!0,"byte":!0,"case":!0,"catch":!0,"char":!0,"class":!0,"const":!0,"continue":!0,"debugger":!0,"default":!0,"delete":!0,"do":!0,"double":!0,"else":!0,"enum":!0,"export":!0,"extends":!0,"false":!0,"final":!0,"finally":!0,"float":!0,"for":!0,"function":!0,"goto":!0,"if":!0,"implements":!0,"import":!0,"in":!0,"instanceof":!0,"int":!0,"interface":!0,"let":!0,"long":!0,"native":!0,"new":!0,"null":!0,"package":!0,"private":!0,"protected":!0,"public":!0,"return":!0,"short":!0,"static":!0,"super":!0,"switch":!0,"synchronized":!0,"this":!0,"throw":!0,"transient":!0,"true":!0,"try":!0,"typeof":!0,"var":!0,"void":!0,"volatile":!0,"while":!0,"with":!0,"yield":!0};e.exports=function(e){return r.hasOwnProperty(e)}},function(e,t,n){"use strict";function r(e){var t=new String(e.value);return t.line=e.line,t.start=e.start,t.end=e.end,t}function i(e,t,n){this.type=e,this.value=t,this.script=null,n?(this.line=n.line+n.value.split(/\n/).length-1,this.line===n.line?this.start=n.end:this.start=n.value.length-n.value.lastIndexOf("\n")-1):(this.line=0,this.start=0),this.end=this.start+this.value.length}var o=function(e,t){for(var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},o=[new i("string",e)],s=0;s<t.length;s++)for(var a=t[s],u=a.test.ignoreCase?"ig":"g",c=new RegExp(a.test.source,u),l=0;l<o.length;l++){var f=o[l],p=o[l-1];if("string"===f.type){for(var h=void 0,d=0,m=[],v=f.value;null!==(h=c.exec(v));)h.index>d&&(p=new i("string",v.slice(d,h.index),p),m.push(p)),p=new i("expression",h[0],p),h[0]=r(p),p.script=a.use.apply(n,h),m.push(p),d=h.index+h[0].length;d<v.length&&(p=new i("string",v.slice(d),p),m.push(p)),o.splice.apply(o,[l,1].concat(m)),l+=m.length-1}}return o};o.TYPE_STRING="string",o.TYPE_EXPRESSION="expression",o.TYPE_RAW="raw",o.TYPE_ESCAPE="escape",e.exports=o},function(e,t,n){"use strict";(function(t){function n(e){return"string"!=typeof e&&(e=e===undefined||null===e?"":"function"==typeof e?n(e.call(e)):JSON.stringify(e)),e}function r(e){var t=""+e,n=s.exec(t);if(!n)return e;var r="",i=void 0,o=void 0,a=void 0;for(i=n.index,o=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:a="&#34;";break;case 38:a="&#38;";break;case 39:a="&#39;";break;case 60:a="&#60;";break;case 62:a="&#62;";break;default:continue}o!==i&&(r+=t.substring(o,i)),o=i+1,r+=a}return o!==i?r+t.substring(o,i):r}/*! art-template@runtime | https://github.com/aui/art-template */
var i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},o=Object.create(i),s=/["&'<>]/;o.$escape=function(e){return r(n(e))},o.$each=function(e,t){if(Array.isArray(e))for(var n=0,r=e.length;n<r;n++)t(e[n],n);else for(var i in e)t(e[i],i)},e.exports=o}).call(t,n(11))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(r){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var r=Object.prototype.toString,i=function(e){return null===e?"Null":r.call(e).slice(8,-1)},o=function s(e,t){var n=void 0,r=i(e);if("Object"===r?n=Object.create(t||{}):"Array"===r&&(n=[].concat(t||[])),n){for(var o in e)Object.hasOwnProperty.call(e,o)&&(n[o]=s(e[o],n[o]));return n}return e};e.exports=o},function(e,t,n){"use strict";var r=function(e,t,r,i){var o=n(0);return i=i.$extend({filename:i.resolveFilename(e,i),bail:!0,source:null}),o(i)(t,r)};e.exports=r},function(e,t,n){"use strict";var r=function(e){console.error(e.name,e.message)};e.exports=r},function(e,t,n){"use strict";var r={__data:Object.create(null),set:function(e,t){this.__data[e]=t},get:function(e){return this.__data[e]},reset:function(){this.__data={}}};e.exports=r},function(e,t,n){"use strict";var r="undefined"==typeof window,i=function(e){if(r){return n(3).readFileSync(e,"utf8")}var t=document.getElementById(e);return t.value||t.innerHTML};e.exports=i},function(e,t,n){"use strict";var r={test:/{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,use:function(e,t,n,i){var o=this,s=o.options,a=o.getEsTokens(i),u=a.map(function(e){return e.value}),c={},l=void 0,f=!!t&&"raw",p=n+u.shift(),h=function(t,n){console.warn((s.filename||"anonymous")+":"+(e.line+1)+":"+(e.start+1)+"\nTemplate upgrade: {{"+t+"}} -> {{"+n+"}}")};switch("#"===t&&h("#value","@value"),p){case"set":i="var "+u.join("").trim();break;case"if":i="if("+u.join("").trim()+"){";break;case"else":var d=u.indexOf("if");~d?(u.splice(0,d+1),i="}else if("+u.join("").trim()+"){"):i="}else{";break;case"/if":i="}";break;case"each":l=r._split(a),l.shift(),"as"===l[1]&&(h("each object as value index","each object value index"),l.splice(1,1));i="$each("+(l[0]||"$data")+",function("+(l[1]||"$value")+","+(l[2]||"$index")+"){";break;case"/each":i="})";break;case"block":l=r._split(a),l.shift(),i="block("+l.join(",").trim()+",function(){";break;case"/block":i="})";break;case"echo":p="print",h("echo value","value");case"print":case"include":case"extend":if(0!==u.join("").trim().indexOf("(")){l=r._split(a),l.shift(),i=p+"("+l.join(",")+")";break}default:if(~u.indexOf("|")){var m=a.reduce(function(e,t){var n=t.value,r=t.type;return"|"===n?e.push([]):"whitespace"!==r&&"comment"!==r&&(e.length||e.push([]),":"===n&&1===e[e.length-1].length?h("value | filter: argv","value | filter argv"):e[e.length-1].push(t)),e},[]).map(function(e){return r._split(e)});i=m.reduce(function(e,t){var n=t.shift();return t.unshift(e),"$imports."+n+"("+t.join(",")+")"},m.shift().join(" ").trim())}f=f||"escape"}return c.code=i,c.output=f,c},_split:function(e){e=e.filter(function(e){var t=e.type;return"whitespace"!==t&&"comment"!==t});for(var t=0,n=e.shift(),r=/\]|\)/,i=[[n]];t<e.length;){var o=e[t];"punctuator"===o.type||"punctuator"===n.type&&!r.test(n.value)?i[i.length-1].push(o):i.push([o]),n=o,t++}return i.map(function(e){return e.map(function(e){return e.value}).join("")})}};e.exports=r},function(e,t,n){"use strict";var r={test:/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,use:function(e,t,n,r){return n={"-":"raw","=":"escape","":!1,"==":"raw","=#":"raw"}[n],t&&(r="/*"+r+"*/",n=!1),{code:r,output:n}}};e.exports=r},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i="undefined"==typeof window,o=function(e,t){if(i){var o,s=n(20).minify,a=t.htmlMinifierOptions,u=t.rules.map(function(e){return e.test});(o=a.ignoreCustomFragments).push.apply(o,r(u)),e=s(e,a)}return e};e.exports=o},function(e,t){!function(e){e.noop=function(){}}("object"==typeof e&&"object"==typeof e.exports?e.exports:window)},function(e,t,n){"use strict";var r="undefined"==typeof window,i=/^\.+\//,o=function(e,t){if(r){var o=n(3),s=t.root,a=t.extname;if(i.test(e)){var u=t.filename,c=!u||e===u,l=c?s:o.dirname(u);e=o.resolve(l,e)}else e=o.resolve(s,e);o.extname(e)||(e+=a)}return e};e.exports=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.name,n=e.source,r=e.path,i=e.line,o=e.column,s=e.generated,a=e.message;if(!n)return a;var u=n.split(/\n/),c=Math.max(i-3,0),l=Math.min(u.length,i+3),f=u.slice(c,l).map(function(e,t){var n=t+c+1;return(n===i?" >> ":"    ")+n+"| "+e}).join("\n");return(r||"anonymous")+":"+i+":"+o+"\n"+f+"\n\n"+t+": "+a+(s?"\n   generated: "+s:"")}var a=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.message));return n.name="TemplateError",n.message=s(e),Error.captureStackTrace&&Error.captureStackTrace(n,n.constructor),n}return o(t,e),t}(Error);e.exports=a},function(e,t,n){"use strict";e.exports=n(2)}])});

/* axios v0.16.2 | (c) 2017 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"[object ArrayBuffer]"===R.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===R.call(e)}function d(e){return"[object File]"===R.call(e)}function l(e){return"[object Blob]"===R.call(e)}function h(e){return"[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function g(e,t){if(null!==e&&"undefined"!=typeof e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)g(arguments[n],e);return t}function b(e,t,n){return g(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:v,forEach:g,merge:x,extend:b,trim:w}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(6),i=n(2),s=n(17),u=n(18),a=n(21),c=n(22);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase(),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url));var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={}}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u)}),e.exports=a},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w)}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var v=n(16),g=(e.withCredentials||u(e.url))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function n(){this.message="String contains an invalid character"}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(19),s=n(20),u=n(6);e.exports=function(e){r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});
//# sourceMappingURL=axios.min.map
/* http://github.com/mindmup/bootstrap-wysiwyg */
(function ($) {
	'use strict';
	var readFileIntoDataUrl = function (fileInfo) {
		var loader = $.Deferred(),
			fReader = new FileReader();
		fReader.onload = function (e) {
			loader.resolve(e.target.result);
		};
		fReader.onerror = loader.reject;
		fReader.onprogress = loader.notify;
		fReader.readAsDataURL(fileInfo);
		return loader.promise();
	};
	$.fn.cleanHtml = function () {
		var html = $(this).html();
		return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
	};
	$.fn.wysiwyg = function (userOptions) {
		var editor = this,
			selectedRange,
			options,
			toolbarBtnSelector,
			updateToolbar = function () {
				if (options.activeToolbarClass) {
					$(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
						var command = $(this).data(options.commandRole);
						if (document.queryCommandState(command)) {
							$(this).addClass(options.activeToolbarClass);
						} else {
							$(this).removeClass(options.activeToolbarClass);
						}
					});
				}
			},
			execCommand = function (commandWithArgs, valueArg) {
				var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '');
				document.execCommand(command, 0, args);
				updateToolbar();
			},
			bindHotkeys = function (hotKeys) {
				$.each(hotKeys, function (hotkey, command) {
					editor.keydown(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
							execCommand(command);
						}
					}).keyup(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
						}
					});
				});
			},
			getCurrentRange = function () {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
					return sel.getRangeAt(0);
				}
			},
			saveSelection = function () {
				selectedRange = getCurrentRange();
			},
			restoreSelection = function () {
				var selection = window.getSelection();
				if (selectedRange) {
					try {
						selection.removeAllRanges();
					} catch (ex) {
						document.body.createTextRange().select();
						document.selection.empty();
					}

					selection.addRange(selectedRange);
				}
			},
			insertFiles = function (files) {
				editor.focus();
				$.each(files, function (idx, fileInfo) {
					if (/^image\//.test(fileInfo.type)) {
						$.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
							execCommand('insertimage', dataUrl);
						}).fail(function (e) {
							options.fileUploadError("file-reader", e);
						});
					} else {
						options.fileUploadError("unsupported-file-type", fileInfo.type);
					}
				});
			},
			markSelection = function (input, color) {
				restoreSelection();
				if (document.queryCommandSupported('hiliteColor')) {
					document.execCommand('hiliteColor', 0, color || 'transparent');
				}
				saveSelection();
				input.data(options.selectionMarker, color);
			},
			bindToolbar = function (toolbar, options) {
				toolbar.find(toolbarBtnSelector).click(function () {
					restoreSelection();
					editor.focus();
					execCommand($(this).data(options.commandRole));
					saveSelection();
				});
				toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

				toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change', function () {
					var newValue = this.value; /* ugly but prevents fake double-calls due to selection restoration */
					this.value = '';
					restoreSelection();
					if (newValue) {
						editor.focus();
						execCommand($(this).data(options.commandRole), newValue);
					}
					saveSelection();
				}).on('focus', function () {
					var input = $(this);
					if (!input.data(options.selectionMarker)) {
						markSelection(input, options.selectionColor);
						input.focus();
					}
				}).on('blur', function () {
					var input = $(this);
					if (input.data(options.selectionMarker)) {
						markSelection(input, false);
					}
				});
				toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
					restoreSelection();
					if (this.type === 'file' && this.files && this.files.length > 0) {
						insertFiles(this.files);
					}
					saveSelection();
					this.value = '';
				});
			},
			initFileDrops = function () {
				editor.on('dragenter dragover', false)
					.on('drop', function (e) {
						var dataTransfer = e.originalEvent.dataTransfer;
						e.stopPropagation();
						e.preventDefault();
						if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
							insertFiles(dataTransfer.files);
						}
					});
			};
		options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
		toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
		bindHotkeys(options.hotKeys);
		if (options.dragAndDropImages) {
			initFileDrops();
		}
		bindToolbar($(options.toolbarSelector), options);
		editor.attr('contenteditable', true)
			.on('mouseup keyup mouseout', function () {
				saveSelection();
				updateToolbar();
			});
		$(window).bind('touchend', function (e) {
			var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
				currentRange = getCurrentRange(),
				clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
			if (!clear || isInside) {
				saveSelection();
				updateToolbar();
			}
		});
		return this;
	};
	$.fn.wysiwyg.defaults = {
		hotKeys: {
			'ctrl+b meta+b': 'bold',
			'ctrl+i meta+i': 'italic',
			'ctrl+u meta+u': 'underline',
			'ctrl+z meta+z': 'undo',
			'ctrl+y meta+y meta+shift+z': 'redo',
			'ctrl+l meta+l': 'justifyleft',
			'ctrl+r meta+r': 'justifyright',
			'ctrl+e meta+e': 'justifycenter',
			'ctrl+j meta+j': 'justifyfull',
			'shift+tab': 'outdent',
			'tab': 'indent'
		},
		toolbarSelector: '[data-role=editor-toolbar]',
		commandRole: 'edit',
		activeToolbarClass: 'btn-info',
		selectionMarker: 'edit-focus-marker',
		selectionColor: 'darkgrey',
		dragAndDropImages: true,
		fileUploadError: function (reason, detail) { console.log("File upload error", reason, detail); }
	};
}($));

;function isObject(value) {
    var type = typeof value
    return value != null && (type == 'object' || type == 'function')
}

var _ = {
    debounce:
        function (func, wait, options) {
            var lastArgs,
                lastThis,
                maxWait,
                result,
                timerId,
                lastCallTime

            var lastInvokeTime = 0
            var leading = false
            var maxing = false
            var trailing = true

            var useRAF = (!wait && wait !== 0 && typeof window.requestAnimationFrame === 'function')

            if (typeof func != 'function') {
                throw new TypeError('Expected a function')
            }
            wait = +wait || 0
            if (isObject(options)) {
                leading = !!options.leading
                maxing = 'maxWait' in options
                maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
                trailing = 'trailing' in options ? !!options.trailing : trailing
            }

            function invokeFunc(time) {
                var args = lastArgs
                var thisArg = lastThis

                lastArgs = lastThis = undefined
                lastInvokeTime = time
                result = func.apply(thisArg, args)
                return result
            }

            function startTimer(pendingFunc, wait) {
                if (useRAF) {
                    return window.requestAnimationFrame(pendingFunc)
                }
                return setTimeout(pendingFunc, wait)
            }

            function cancelTimer(id) {
                if (useRAF) {
                    return window.cancelAnimationFrame(id)
                }
                clearTimeout(id)
            }

            function leadingEdge(time) {
                // Reset any `maxWait` timer.
                lastInvokeTime = time
                // Start the timer for the trailing edge.
                timerId = startTimer(timerExpired, wait)
                // Invoke the leading edge.
                return leading ? invokeFunc(time) : result
            }

            function remainingWait(time) {
                var timeSinceLastCall = time - lastCallTime
                var timeSinceLastInvoke = time - lastInvokeTime
                var timeWaiting = wait - timeSinceLastCall

                return maxing
                    ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
                    : timeWaiting
            }

            function shouldInvoke(time) {
                var timeSinceLastCall = time - lastCallTime
                var timeSinceLastInvoke = time - lastInvokeTime

                // Either this is the first call, activity has stopped and we're at the
                // trailing edge, the system time has gone backwards and we're treating
                // it as the trailing edge, or we've hit the `maxWait` limit.
                return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                    (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
            }

            function timerExpired() {
                var time = Date.now()
                if (shouldInvoke(time)) {
                    return trailingEdge(time)
                }
                // Restart the timer.
                timerId = startTimer(timerExpired, remainingWait(time))
            }

            function trailingEdge(time) {
                timerId = undefined

                // Only invoke if we have `lastArgs` which means `func` has been
                // debounced at least once.
                if (trailing && lastArgs) {
                    return invokeFunc(time)
                }
                lastArgs = lastThis = undefined
                return result
            }

            function cancel() {
                if (timerId !== undefined) {
                    cancelTimer(timerId)
                }
                lastInvokeTime = 0
                lastArgs = lastCallTime = lastThis = timerId = undefined
            }

            function flush() {
                return timerId === undefined ? result : trailingEdge(Date.now())
            }

            function pending() {
                return timerId !== undefined
            }

            function debounced() {
                var time = Date.now()
                var isInvoking = shouldInvoke(time)

                lastArgs = arguments;
                lastThis = this
                lastCallTime = time

                if (isInvoking) {
                    if (timerId === undefined) {
                        return leadingEdge(lastCallTime)
                    }
                    if (maxing) {
                        // Handle invocations in a tight loop.
                        timerId = startTimer(timerExpired, wait)
                        return invokeFunc(lastCallTime)
                    }
                }
                if (timerId === undefined) {
                    timerId = startTimer(timerExpired, wait)
                }
                return result
            }
            debounced.cancel = cancel
            debounced.flush = flush
            debounced.pending = pending
            return debounced
        }

};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// Generated by CoffeeScript 2.1.0
(function () {
  /*
  jQuery Growl
  Copyright 2015 Kevin Sylvestre
  1.3.5
  */
  "use strict";

  var $, Animation, Growl;

  $ = window.$;

  Animation = function () {
    var Animation = function () {
      function Animation() {
        _classCallCheck(this, Animation);
      }

      _createClass(Animation, null, [{
        key: "transition",
        value: function transition($el) {
          var el, ref, result, type;
          el = $el[0];
          ref = this.transitions;
          for (type in ref) {
            result = ref[type];
            if (el.style[type] != null) {
              return result;
            }
          }
        }
      }]);

      return Animation;
    }();

    ;

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "oTransition": "oTransitionEnd",
      "transition": "transitionend"
    };

    return Animation;
  }();

  Growl = function () {
    var Growl = function () {
      _createClass(Growl, null, [{
        key: "growl",
        value: function growl() {
          var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          return new Growl(settings);
        }
      }]);

      function Growl() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Growl);

        this.render = this.render.bind(this);
        this.bind = this.bind.bind(this);
        this.unbind = this.unbind.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.click = this.click.bind(this);
        this.close = this.close.bind(this);
        this.cycle = this.cycle.bind(this);
        this.waitAndDismiss = this.waitAndDismiss.bind(this);
        this.present = this.present.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.remove = this.remove.bind(this);
        this.animate = this.animate.bind(this);
        this.$growls = this.$growls.bind(this);
        this.$growl = this.$growl.bind(this);
        this.html = this.html.bind(this);
        this.content = this.content.bind(this);
        this.container = this.container.bind(this);
        this.settings = $.extend({}, Growl.settings, settings);
        this.initialize(this.settings.location);
        this.render();
      }

      _createClass(Growl, [{
        key: "initialize",
        value: function initialize(location) {
          var id = 'growls-' + location;
          var box = $('#' + id);
          if (!box) {
            return box.append('<div id="' + id + '" />');
          }
          // return $('body:not(:has(#' + id + '))').append('<div id="' + id + '" />');
        }
      }, {
        key: "render",
        value: function render() {
          var $growl = this.$growl();
          this.$growls(this.settings.location).append($growl);
          if (this.settings.fixed) {
            this.present();
          } else {
            this.cycle();
          }
        }
      }, {
        key: "bind",
        value: function bind() {
          var $growl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$growl();

          this.settings.mounted && this.settings.mounted();
          $growl.on("click", this.click);
          if (this.settings.delayOnHover) {
            $growl.on("mouseenter", this.mouseEnter);
            $growl.on("mouseleave", this.mouseLeave);
          }
          return $growl.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close);
        }
      }, {
        key: "unbind",
        value: function unbind() {
          var $growl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$growl();

          $growl.off("click", this.click);
          if (this.settings.delayOnHover) {
            $growl.off("mouseenter", this.mouseEnter);
            $growl.off("mouseleave", this.mouseLeave);
          }
          return $growl.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close);
        }
      }, {
        key: "mouseEnter",
        value: function mouseEnter(event) {
          var $growl;
          $growl = this.$growl();
          return $growl.stop(true, true);
        }
      }, {
        key: "mouseLeave",
        value: function mouseLeave(event) {
          return this.waitAndDismiss();
        }
      }, {
        key: "click",
        value: function click(event) {
          if (this.settings.url != null) {
            event.preventDefault();
            event.stopPropagation();
            return window.open(this.settings.url);
          }
          this.settings.clickToClose && this.close(event);
        }
      }, {
        key: "close",
        value: function close(event) {
          var $growl;
          event.preventDefault();
          event.stopPropagation();
          $growl = this.$growl();
          return $growl.stop().queue(this.dismiss).queue(this.remove);
        }
      }, {
        key: "cycle",
        value: function cycle() {
          var $growl;
          $growl = this.$growl();
          return $growl.queue(this.present).queue(this.waitAndDismiss());
        }
      }, {
        key: "waitAndDismiss",
        value: function waitAndDismiss() {
          if(this.settings.duration) {
            var $growl;
            $growl = this.$growl();
            return $growl.delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
          };
        }
      }, {
        key: "present",
        value: function present(callback) {
          var $growl;
          $growl = this.$growl();
          this.bind($growl);
          return this.animate($growl, this.settings.namespace + "-incoming", 'out', callback);
        }
      }, {
        key: "dismiss",
        value: function dismiss(callback) {
          var $growl = this.$growl();
          this.unbind($growl);
          return this.animate($growl, this.settings.namespace + "-outgoing", 'in', callback);
        }
      }, {
        key: "remove",
        value: function remove(callback) {
          this.settings.destory && this.settings.destory();

          this.$growl().remove();
          return typeof callback === "function" ? callback() : void 0;
        }
      }, {
        key: "animate",
        value: function animate($element, name) {
          var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'in';
          var callback = arguments[3];

          var transition = Animation.transition($element);
          $element[direction === 'in' ? 'removeClass' : 'addClass'](name);
          $element.offset().position;
          $element[direction === 'in' ? 'addClass' : 'removeClass'](name);
          if (callback == null) {
            return;
          }
          if (transition != null) {
            $element.one(transition, callback);
          } else {
            callback();
          }
        }
      }, {
        key: "$growls",
        value: function $growls(location) {
          var base;
          if (this.$_growls == null) {
            this.$_growls = [];
          }
          return (base = this.$_growls)[location] != null ? base[location] : base[location] = $('#growls-' + location);
        }
      }, {
        key: "$growl",
        value: function $growl() {
          return this.$_growl != null ? this.$_growl : this.$_growl = $(this.html());
        }
      }, {
        key: "html",
        value: function html() {
          return this.container(this.content());
        }
      }, {
        key: "content",
          value: function content() {
            var title = "<div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div><div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>";
            var message = this.settings.message ? ("<div class='" + this.settings.namespace + "-body'>" + title + "<div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div></div>") : title;
          return message;
        }
      }, {
        key: "container",
        value: function container(content) {
          var sets = this.settings;
          var layout = sets.layout;
          return "<div class='" + (layout ? (layout + ' ') : '') + sets.namespace + " " + sets.namespace + "-" + sets.style + " " + sets.namespace + "-" + sets.size + "'>\n  " + content + "\n</div>";
        }
      }]);

      return Growl;
    }();

    Growl.settings = {
      layout: '',
      namespace: 'growl',
      duration: 2000,
      close: '&#215;',
      clickToClose: true,
      location: 'default',
      delayOnHover: true,
      style: 'default',
      size: 'medium',
      fixed: false,
      mounted: null,
      destory: null,
      confirm: null,
      cancel: null,
    };

    return Growl;
  }();

  this.Growl = Growl;

  $.growl = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return Growl.growl(options);
  };

  $.growl.error = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var settings;
    settings = {
      title: "Error!",
      style: "error"
    };
    return $.growl($.extend(settings, options));
  };

  $.growl.notice = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var settings;
    settings = {
      title: "Notice!",
      style: "notice"
    };
    return $.growl($.extend(settings, options));
  };

  $.growl.warning = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var settings;
    settings = {
      title: "Warning!",
      style: "warning"
    };
    return $.growl($.extend(settings, options));
  };
}).call(this);

/*
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-beta.2
 *
 */

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory(root));
    } else {
        root.LazyLoad = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    var defaults = {
        src: "data-src",
        srcset: "data-srcset",
        selector: ".lazyload"
    };

    var extend = function ()  {

        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        /* Check if a deep merge */
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        /* Merge the object into the extended object */
        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    /* If deep merge and property is an object, merge properties */
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        /* Loop through each object and conduct a merge */
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    function LazyLoad(images, options) {
        this.settings = extend(defaults, options || {});
        this.images = images || document.querySelectorAll(this.settings.selector);
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function() {

            /* Without observers load everything and bail out early. */
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            var self = this;
            var observerConfig = {
                root: null,
                rootMargin: "0px",
                threshold: [0]
            };

            this.observer = new IntersectionObserver(function(entries) {
                entries.forEach(function (entry) {
                    if (entry.intersectionRatio > 0) {
                        self.observer.unobserve(entry.target);
                        var src = entry.target.getAttribute(self.settings.src);
                        var srcset = entry.target.getAttribute(self.settings.srcset);
                        if ("img" === entry.target.tagName.toLowerCase()) {
                            if (src) {
                                entry.target.src = src;
                            }
                            if (srcset) {
                                entry.target.srcset = srcset;
                            }
                        } else {
                            entry.target.style.backgroundImage = "url(" + src + ")";
                        }
                    }
                });
            }, observerConfig);

            this.images.forEach(function (image) {
                self.observer.observe(image);
            });
        },

        loadAndDestroy: function () {
            if (!this.settings) { return; }
            this.loadImages();
            this.destroy();
        },

        loadImages: function () {
            if (!this.settings) { return; }

            var self = this;
            this.images.forEach(function (image) {
                var src = image.getAttribute(self.settings.src);
                var srcset = image.getAttribute(self.settings.srcset);
                if ("img" === image.tagName.toLowerCase()) {
                    if (src) {
                        image.src = src;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                } else {
                    image.style.backgroundImage = "url(" + src + ")";
                }
            });
        },

        destroy: function () {
            if (!this.settings) { return; }
            this.observer.disconnect();
            this.settings = null;
        }
    };

    root.lazyload = function(images, options) {
        return new LazyLoad(images, options);
    };

    $.fn.lazyload = function (options) {
        options = options || {};
        options.attribute = options.attribute || "data-src";
        new LazyLoad($.makeArray(this), options);
        return this;
    };

    return LazyLoad;
});

// 初始化方法
var images = document.querySelectorAll(".lazyload");
lazyload(images);
