import{o as t}from"./jsxRuntime.module.fd3391b7.js";import{p as i}from"./preact.module.8d3ceea4.js";function f(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var p=function(n){n=Math.abs(n);var a=n%100;if(a>=10&&a<=20)return"th";var r=n%10;return r===1?"st":r===2?"nd":r===3?"rd":"th"};const y=f(p),s={year:24*60*60*1e3*365,month:24*60*60*1e3*365/12,week:24*60*60*1e3*7,day:24*60*60*1e3,hour:60*60*1e3,minute:60*1e3,second:1e3},w=(e,n=s.week,a="en-GB")=>{const r=new Intl.RelativeTimeFormat(a,{numeric:"auto"}),c=e-new Date().getTime();if(Math.abs(c)>n)return null;for(const o of Object.keys(s))if(Math.abs(c)>s[o]||o=="second")return r.format(Math.round(c/s[o]),o);return null},v=({date:e,locale:n="en-GB",dateStyles:a,prepositionStyles:r,relativePreposition:c="",absolutePreposition:o="on"})=>{const l=new Date(e).getTime(),u=w(l),[m,d,h]=new Date(l).toLocaleDateString(n,{year:"numeric",month:"long",day:"numeric"}).split(" ");return u?t(i,{children:[t("span",{className:r,children:[c," "]}),t("span",{className:a,children:t(i,{children:u})})]}):t(i,{children:[t("span",{className:r,children:[o," "]}),t("span",{className:a,children:t(i,{children:[m,t("sup",{children:y(+m)}),` ${d} ${h}`]})})]})};export{v as default};