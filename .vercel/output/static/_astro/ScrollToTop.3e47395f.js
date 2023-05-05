import{p as s,h as g}from"./hooks.module.86c7875b.js";import{p as k,y as f}from"./preact.module.8d3ceea4.js";import{o}from"./jsxRuntime.module.fd3391b7.js";const C=()=>{const[m,x]=s(()=>globalThis?globalThis.innerHeight:1e3),r=globalThis||null,i=f(),l=f(),t=f(),[v,c]=s(!1),[d,b]=s(!1),[a,n]=s(!1);g(()=>{if(r)return r.addEventListener("scroll",h(p,200)),()=>{r.removeEventListener("scroll",h(p,300))}},[r]),g(()=>{function e(){t.current=setInterval(()=>{a||b(!1)},800)}return e(),()=>{t.current&&clearInterval(t.current)}},[a]);const h=(e,y=0)=>{let u=!1;return(...w)=>{u||(e(...w),u=!0,setTimeout(()=>{u=!1},y))}},p=()=>{const e=r instanceof Window?r?.scrollY:r?.scrollTop;e>m&&e<i.current&&(c(!0),l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{c(!1)},2400)),(e<m||e>=i.current)&&(n(!1),c(!1)),i.current=e},T=()=>{n(!1),r?.scrollTo({top:0,behavior:"smooth"})};return o(k,{children:[o("style",{children:`
  @keyframes bounce-reverse {
    0%, 100% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    50% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
  }
  `}),o("button",{onMouseEnter:()=>{n(!0),d||b(!0)},onMouseLeave:()=>{n(!1),t.current&&clearInterval(t.current)},class:`fixed bottom-6 right-10 bg-primary origin-center transition-transform shadow-xl rounded-full text-primary flex items-center justify-center border-2 p-3 focus:outline-none focus:ring-0 dark:border-slate-600 ${v||a?"scale-100":"scale-0"} ${d&&"[animation:bounce-reverse_0.8s_infinite]"}`,onClick:T,"aria-label":"Scroll to top",children:o("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":2,d:"M5 10l7-7m0 0l7 7m-7-7v18"})})})]})};export{C as default};
