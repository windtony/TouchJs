(function(webtap){var selector=webtap||"code";var keywords=("var function if else for while break switch case do new null in with void "+"continue delete return this true false throw catch typeof with instanceof script test module").split(" "),special=("eval window document undefined NaN Infinity parseInt parseFloat "+"encodeURI decodeURI encodeURIComponent decodeURIComponent $").split(" ");var syntax=[["comment",/(\/\*(?:[^*\n]|\*+[^\/*])*\*+\/)/g],["comment",/(\/\/[^\n]*)/g],["string",/("(?:(?!")[^\\\n]|\\.)*"|'(?:(?!')[^\\\n]|\\.)*')/g],["regexp",/(\/.+\/[mgi]*)(?!\s*\w)/g],["class",/\b([A-Z][a-zA-Z]+)\b/g],["number",/\b([0-9]+(?:\.[0-9]+)?)\b/g],["keyword",new (RegExp)("\\b("+keywords.join("|")+")\\b","g")],["special",new (RegExp)("\\b("+special.join("|")+")\\b","g")]];var nodes,table={};function runhijs(){nodes=[];table={};if(/^[a-z]+$/.test(selector)){nodes=document.getElementsByTagName(selector)}else{if(/^\.[\w-]+$/.test(selector)){nodes=document.getElementsByClassName(selector.slice(1))}else{if(document.querySelectorAll){nodes=document.querySelectorAll(selector)}else{nodes=[]}}}for(var i=0,children;i<nodes.length;i++){children=nodes[i].childNodes;for(var j=0,str;j<children.length;j++){code=children[j];if(code.length>=0){if(!/^\$/.test(code.nodeValue.trim())){syntax.forEach(function(s){var k=s[0],v=s[1];code.nodeValue=code.nodeValue.replace(v,function(_,m){return"\u00ab"+encode(k)+"\u00b7"+encode(m)+"\u00b7"+encode(k)+"\u00bb"})})}}}}for(var i=0;i<nodes.length;i++){nodes[i].innerHTML=nodes[i].innerHTML.replace(/\u00ab(.+?)\u00b7(.+?)\u00b7\1\u00bb/g,function(_,name,value){value=value.replace(/\u00ab[^\u00b7]+\u00b7/g,"").replace(/\u00b7[^\u00bb]+\u00bb/g,"");return'<span class="'+decode(name)+'">'+escape(decode(value))+"</span>"})}}function escape(str){return str.replace(/</g,"&lt;").replace(/>/g,"&gt;")}function encode(str,encoded){table[encoded=str.split("").map(function(s){if(s.charCodeAt(0)>127){return s}return String.fromCharCode(s.charCodeAt(0)+10240)}).join("")]=str;return encoded}function decode(str){if(str in table){return table[str]}else{return str.trim().split("").map(function(s){if(s.charCodeAt(0)-10240>127){return s}return String.fromCharCode(s.charCodeAt(0)-10240)}).join("")}}window.runhijs=runhijs})(window.webtap);