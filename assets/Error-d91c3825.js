import{b as i,r as a,d,j as t}from"./index-332d1d53.js";const m=()=>{const n=i(),[e,r]=a.useState(3),o=d();return a.useEffect(()=>{let s;return e>0?s=setTimeout(()=>{r(c=>c-1)},1e3):e===0&&o("/"),()=>clearTimeout(s)},[e]),t.jsx("div",{className:"container text-center mt-5",children:t.jsxs("h4",{children:["頁面 ",t.jsx("span",{className:"text-danger px-3",children:n.pathname}),"不存在，",e," 秒後返回首頁"]})})};export{m as default};