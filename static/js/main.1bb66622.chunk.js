(this["webpackJsonpcrl-timer"]=this["webpackJsonpcrl-timer"]||[]).push([[0],{34:function(e,t,n){e.exports=n(49)},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(12),c=n.n(i),o=(n(39),n(14)),l=n(23),u=n.n(l),m=(n(40),function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],i=t[1],c=Object(a.useRef)(null),l=[];Object(a.useEffect)((function(){c.current=n;var e=c.current;if(e){var t=e.getContext("2d");if(t){var a=function(e){var t=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/t}(t),r=getComputedStyle(e).getPropertyValue("width").slice(0,-2),i=getComputedStyle(e).getPropertyValue("height").slice(0,-2);e.width=+r*a,e.height=+i*a,e.style.width="".concat(r,"px"),e.style.height="".concat(i,"px");var o,l=.06*e.width;m(e.width,e.height,l);return function n(){t&&(s(t,e),e&&d(e.width,e.height),o=requestAnimationFrame(n))}(),function(){cancelAnimationFrame(o)}}}}));var m=function(e,t,n){for(var a=0;a<n;a++)l.push({x:Math.random()*e,y:Math.random()*t,radius:1*Math.random()+1,vx:Math.floor(50*Math.random())-25,vy:Math.floor(50*Math.random())-25})},s=function(e,t){if(t){e.clearRect(0,0,t.width,t.height),e.globalCompositeOperation="lighter";for(var n=0,a=l.length;n<a;n++){var r=l[n];e.fillStyle="#efefef",e.beginPath(),e.arc(r.x,r.y,r.radius,0,2*Math.PI),e.fill(),e.fillStyle="black",e.stroke()}e.beginPath();for(var i=0,c=l.length;i<c;i++){var o=l[i];e.moveTo(o.x,o.y);for(var u=0,m=l.length;u<m;u++){var s=l[u];f(o,s)<150&&e.lineTo(s.x,s.y)}}e.lineWidth=.05,e.strokeStyle="white",e.stroke()}},f=function(e,t){var n=0,a=0;return n=t.x-e.x,n*=n,a=t.y-e.y,a*=a,Math.sqrt(n+a)},d=function(e,t){for(var n=0,a=l.length;n<a;n++){var r=l[n];r.x+=r.vx/60,r.y+=r.vy/60,(r.x<0||r.x>e)&&(r.vx=-r.vx),(r.y<0||r.y>t)&&(r.vy=-r.vy)}};return r.a.createElement(u.a,{canvasRef:function(e){return i(e)},onResize:s})}),s=(n(41),Object(a.createContext)({startTimer:function(){}})),f=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],i=t[1];return r.a.createElement(s.Provider,{value:{startTimer:function(){return i(!n)}}},r.a.createElement("div",{id:"timermain"},n?r.a.createElement(g,null):r.a.createElement(R,null)))},d=n(24),h=n(15),p=n(25),v=n(26),x=n(31),g=(n(42),function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(x.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"timerpad"},r.a.createElement("p",null,"timerpad"),"'231.asd3f'.match(/(\\d[\\d.]*)/g)")}}]),t}(a.Component)),b=n(7),y=n(27),k=n(2),E=n(64),j=n(66),O=n(68),S=n(67),w=n(28),C=n.n(w);n(43);function P(e){var t=e.inputRef,n=Object(k.a)(e,["inputRef"]);return r.a.createElement(C.a,Object.assign({},n,{ref:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){t(e?e.inputElement:null)})),mask:[/\d/,/\d/,":",/\d/,/\d/,":",/\d/,/\d/],placeholderChar:"0",showMask:!0}))}var R=function(){var e,t=Object(a.useContext)(s).startTimer,n=r.a.useState({textmask:"00:00:00"}),i=Object(o.a)(n,2),c=i[0],l=i[1],u=function(e){var t=(e+c.textmask.replace(/:/g,"").slice(0,-1)).replace(/^(\d{2})(\d{2})/,"$1:$2:");l({textmask:t})};return r.a.createElement("div",{id:"numericpad"},r.a.createElement(E.a,{id:"paper"},r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,{id:"formatted-text-mask-input",value:c.textmask,onChange:(e="textmask",function(t){l(Object(y.a)({},c,Object(b.a)({},e,t.target.value)))}),inputComponent:P,autoComplete:"false",fullWidth:!0}),[["1","2","3"],["4","5","6"],["7","8","9"]].map((function(e){return r.a.createElement(j.a,{key:e[0],container:!0,justify:"space-between",alignItems:"center",spacing:1},e.map((function(e){return r.a.createElement(j.a,{key:e,item:!0,xs:4},r.a.createElement(S.a,{id:"numeric-button",onClick:function(){return u(e)}},e))})))})),r.a.createElement(j.a,{container:!0,justify:"space-between",alignItems:"center",spacing:1},r.a.createElement(j.a,{item:!0,xs:4},r.a.createElement(S.a,{id:"text-input-button",variant:"contained",color:"primary",onClick:t},"Start")),r.a.createElement(j.a,{item:!0,xs:4},r.a.createElement(S.a,{id:"numeric-button",variant:"contained",onClick:function(){return u("0")}},"0")),r.a.createElement(j.a,{item:!0,xs:4},r.a.createElement(S.a,{id:"text-input-button",variant:"contained",color:"secondary",onClick:function(){return l({textmask:"00:00:00"})}},"Clear"))))))},M=(n(48),function(){return r.a.createElement("div",{className:"App"},r.a.createElement(f,null),r.a.createElement(m,null))});c.a.render(r.a.createElement(M,null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.1bb66622.chunk.js.map