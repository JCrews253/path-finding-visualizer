(this["webpackJsonppath-finding-visualizer"]=this["webpackJsonppath-finding-visualizer"]||[]).push([[0],[,,,,,,,function(e,t,n){},,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(8),o=n.n(c),u=(n(7),n(1)),i=(n(14),function(){var e=Object(r.useState)(1),t=Object(u.a)(e,2),n=t[0],c=(t[1],Object(r.useState)(1)),o=Object(u.a)(c,2),i=o[0];o[1];return a.a.createElement("div",{className:"header"},a.a.createElement("h1",null,"Height: ",n),a.a.createElement("h1",null,"Width: ",i),a.a.createElement("h1",null,"divs in bottom ",Math.floor(n/101.05)),a.a.createElement("h1",null,"divs in top ",Math.floor(n/34.9)-1))}),s=n(2),f=(n(4),n(15),function(){window.onmousedown=function(e){e.preventDefault(),"mousedown"===e.type&&(t.current=!0)},window.onmouseup=function(e){"mouseup"===e.type&&(t.current=!1)},window.onresize=function(){e()};var e=function(){if(!n.current&&w){var e=Object(s.a)(h),t=[];if(window.innerWidth<1950)for(var r=0;r<18;r++){for(var a=0;a<=r;a++)t.push(55*r+a),t.push(55*r-a);t.push(990-r-1)}if(window.innerWidth<1900)for(var c=0;c<18;c++){for(var o=0;o<=c;o++)t.push(55*c+o+1),t.push(55*c-o-1);t.push(990-c-2)}if(window.innerWidth<1550)for(var u=0;u<18;u++){for(var i=0;i<=u;i++)t.push(55*u+i+2),t.push(55*u-i-2);t.push(990-u-3)}if(window.innerWidth<1450)for(var f=0;f<18;f++){for(var l=0;l<=f;l++)t.push(55*f+l+3),t.push(55*f-l-3);t.push(990-f-4)}if(window.innerWidth<1350)for(var p=0;p<18;p++){for(var m=0;m<=p;m++)t.push(55*p+m+4),t.push(55*p-m-4);t.push(990-p-5)}t.forEach((function(t){e[t]=!0})),d(e)}},t=Object(r.useRef)(!1),n=Object(r.useRef)(!1),c=Object(r.useRef)(-1),o=Object(r.useState)(50),i=Object(u.a)(o,2),f=i[0],l=(i[1],Object(r.useState)((function(){return function(){for(var e=[],t=0;t<990;t++)e[t]=Math.random()>=1;return e}()}))),p=Object(u.a)(l,2),h=p[0],d=p[1],m=Object(r.useState)(!0),v=Object(u.a)(m,2),w=v[0];v[1];return h[27]=!1,h[962]=!1,a.a.createElement("div",{className:"grid-container"},a.a.createElement("div",{className:"grid",style:{marginTop:"".concat(w?"-314px":"0px"),transform:"".concat(w?"perspective(800px) rotateX(60deg)":""),gridTemplateColumns:"repeat(".concat(55,",auto)")}},h.map((function(r,o){return a.a.createElement("div",{className:["node","".concat(27===o?"start":""),"".concat(962===o?"finish":""),"".concat(h[o]?"wall":"")].join(" "),key:o,onMouseDown:function(){return function(t){if(e(),!n.current){c.current=t;var r=Object(s.a)(h);r[t]=!h[t],d(r)}}(o)},onMouseEnter:function(){return function(e){if(t.current&&e!==c.current){c.current=e;var n=Object(s.a)(h);n[e]=!h[e],d(n)}}(o)},style:{width:"".concat(f,"px"),height:"".concat(f,"px")}})}))))});var l=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(i,null),a.a.createElement(f,null))};o.a.render(a.a.createElement(l,null),document.getElementById("root"))}],[[9,1,2]]]);
//# sourceMappingURL=main.8c8620b4.chunk.js.map