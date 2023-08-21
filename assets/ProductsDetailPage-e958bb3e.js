import{r as l,j as s,P as C,F as k,u as E,l as R,m as b,A as W}from"./index-be291655.js";import{e as A,b as B}from"./clientApis-bf073319.js";import{u as F}from"./useMessage-7fdf99ad.js";import{Q as I}from"./QuantityButtonGroup-3e196656.js";import{W as D}from"./WishlistButtonGroup-1c1a870e.js";import{S as j,a as w}from"./swiper-bundle-6f0f1b89.js";import{A as G}from"./AccordionCollapse-ffb26220.js";import{B as M}from"./Breadcrumb-b7416e52.js";import{u as U}from"./useDispatch-852928e2.js";import"./react-toastify.esm-d941eb01.js";import"./index.esm-3e9a1a10.js";import"./iconBase-aff2fccf.js";import"./index.esm-6ea3277d.js";import"./TransitionWrapper-22889fd5.js";import"./setPrototypeOf-72fdee31.js";import"./extends-98964cd2.js";const z=l.memo(({imagesList:e,alt:m})=>{const[p,u]=l.useState(null),c=l.useRef(null),n=l.useRef(null);return s.jsxs("div",{className:"row flex-row flex-sm-column-reverse flex-lg-row ",children:[s.jsx("div",{className:"d-none d-sm-block col-md-12 col-lg-12 col-xl-3  ps-sm-2 ps-lg-1 ps-xl-4 ps-xxl-0 ",children:s.jsx(j,{onSwiper:u,slidesPerView:5,spaceBetween:10,freeMode:!0,watchSlidesProgress:!0,className:"thumbs-swiper-container ms-sm-1 ms-lg-0",breakpoints:{768:{slidesPerView:5}},children:e==null?void 0:e.map((r,d)=>s.jsx(w,{className:"thumbs-swiper my-sm-2 my-xl-0 mb-xl-2 ms-xl-2 ms-xxl-4  ",children:s.jsx("img",{src:r,alt:m,className:"thumbs-swiper-img d-block object-fit-cover"})},d))})}),s.jsx("div",{className:"col-12 col-md-12 col-lg-12 col-xl-9 px-lg-1",children:s.jsxs(j,{slidesPerView:1,slidesPerGroup:1,modules:[C],autoplay:{delay:3e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},grabCursor:!0,pagination:{clickable:!0},className:"mySwiper",thumbs:{swiper:p},style:{"--swiper-navigation-color":"#111c30","--swiper-navigation-size":"35px","--swiper-pagination-color":"#111c30","--swiper-pagination-bullet-size":"10px"},onInit:r=>{r.params.navigation.prevEl=c.current,r.params.navigation.nextEl=n.current,r.navigation.init(),r.navigation.update()},children:[e==null?void 0:e.map((r,d)=>s.jsx(w,{children:s.jsx("img",{src:r,alt:m,className:"swiper-img"})},r)),s.jsx("div",{ref:c,className:"swiper-button-prev"}),s.jsx("div",{ref:n,className:"swiper-button-next"})]})})]})}),as=()=>{const[e,m]=l.useState({}),[p,u]=l.useState(1),{id:c}=k(),{inputToastMessage:n}=F(),[r,d]=l.useState(!1),x=U(),y=E(t=>t.loading),[h,N]=l.useState([]),g=l.useCallback(async t=>{var a,i;try{const o=await R({method:"GET",baseURL:null,url:"https://ben0588.github.io/react-fragrance-dawn/detail.json","Content-Type":"application/json"}),P=(a=o==null?void 0:o.data)==null?void 0:a.filter(T=>T.category===t);N(P[0].contents)}catch(o){n((i=o==null?void 0:o.response)==null?void 0:i.data)}},[]),f=l.useCallback(async()=>{var t,a;try{x(b(!0));const i=await A(c);g(i.data.product.category),m((t=i==null?void 0:i.data)==null?void 0:t.product),x(b(!1))}catch(i){n((a=i==null?void 0:i.response)==null?void 0:a.data),x(b(!1))}},[g]);l.useEffect(()=>{f()},[c,f]);const v=async()=>{var t;try{d(!0);const a={product_id:e.id,qty:p},i=await B(a);x(W(a)),d(!1),n(i.data)}catch(a){n((t=a==null?void 0:a.response)==null?void 0:t.data)}},S=t=>new Intl.NumberFormat("zh-TW",{style:"currency",currency:"TWD",minimumFractionDigits:0}).format(t);return s.jsxs("div",{className:"container my-5",children:[s.jsx(M,{category:e.category,title:e.title,className:"mb-2 ps-ms-0 ps-xl-0 mb-xl-4 ps-xxl-3"}),y.isLoading?s.jsx("div",{children:"isLoading 資料加載中"}):s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"row g-3 mb-5",children:[s.jsx("div",{className:"col-12 col-lg-6 pe-xl-5",children:e.imagesUrl&&s.jsx(z,{imagesList:e.imagesUrl,alt:e.title,imgWidth:"100%",imgHeight:"500px"})}),s.jsxs("div",{className:"col-12 col-lg-6 position-relative px-3 py-3 ",children:[s.jsx(D,{product:e,id:c,changePosition:"change-wishlist-icon-position"}),s.jsxs("h1",{className:"d-flex flex-column  mb-0",children:[s.jsx("span",{className:"text-primary fw-bolder fs-4",children:e.title}),s.jsx("span",{className:"text-muted fs-5 mt-2",children:e.content})]}),s.jsxs("div",{className:"fs-4 fw-bolder text-primary mt-4",children:["NT",S(e.price)]}),s.jsxs("span",{className:"text-decoration-line-through text-muted fs-7",children:["建議售價：$",e.origin_price]}),s.jsx("div",{role:"button",className:"fs-6 border border-2 py-2 text-center my-3",style:{width:"100%",maxWidth:"70px"},children:e.unit}),s.jsxs("div",{className:"d-flex align-items-center mb-3",children:[s.jsx(I,{quantity:p,setChange:u}),s.jsxs("button",{type:"button",className:"btn btn-primary w-75 ms-3",onClick:v,disabled:r,children:[r&&s.jsx("span",{className:"spinner-border spinner-border-sm me-2",role:"status","aria-hidden":"true"}),r?"正在加入購物車中":"加入購物車"]})]}),s.jsxs("div",{className:"d-flex flex-column border-start border-5 border-primary ps-2 mb-4 mt-5 ",children:[s.jsx("span",{className:"text-ellipsis",children:"全店，滿額免運：全店滿$999元免運 (海外地區不適用)"}),s.jsx("span",{className:"text-ellipsis",children:"全店，滿額贈：消費滿$2000元贈 TEXT 品牌提袋 x1"})]}),s.jsx("div",{className:"mt-3",children:s.jsx(G,{list:[{title:"產品介紹",text:e.description},{title:"用法&用途",text:"適量噴灑於雙手脈搏處、及耳後。"},{title:"主要成分",text:"如包裝所示。"}]})})]})]}),s.jsxs("div",{className:"mt-5",children:[s.jsx("p",{className:"text-center fs-4 fw-bolder  my-5",children:s.jsx("span",{className:"border-bottom border-3 border-primary",children:"商品描述"})}),h==null?void 0:h.map((t,a)=>s.jsxs("div",{children:[s.jsx("img",{src:t.imageUrl,alt:t.content,className:"d-block w-100 object-fit-cover"}),s.jsx("p",{className:"text-center fs-6 my-5",children:t.content})]},a))]})]})]})};export{as as default};