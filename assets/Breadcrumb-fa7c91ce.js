import{r as m,u as l,j as r,N as i,y as n}from"./index-332d1d53.js";import{u as d}from"./useDispatch-d4babc08.js";const h=m.memo(({category:e,title:s,className:c})=>{const t=d();l(a=>a.category);const o=a=>{t(n(e))};return r.jsx("nav",{"aria-label":"breadcrumb py-2",children:r.jsxs("ol",{className:`breadcrumb ${c||""}`,children:[r.jsx("li",{className:"breadcrumb-item",children:r.jsx(i,{to:"/products",children:"全部商品"})}),e&&r.jsx("li",{className:"breadcrumb-item ",children:r.jsx(i,{to:"/products",onClick:a=>o(),children:e})}),s&&r.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:s})]})})});export{h as B};