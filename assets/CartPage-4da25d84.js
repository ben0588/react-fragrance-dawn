import{r as g,j as e,L as v,X as P,Y as N,Z as $,u as w,$ as S,a0 as D,m as y,a1 as F,a2 as M}from"./index-131eb30e.js";import{f as R,g as q,h as O,i as A,j as I}from"./clientApis-016cf649.js";import{u as T}from"./useMessage-aafe73ad.js";import{S as m}from"./sweetalert2.all-c223cf0e.js";import{b as E}from"./index.esm-5e24e044.js";import{W as U}from"./WishlistButtonGroup-62aa802b.js";import"./QuantityButtonGroup-a87675d0.js";import{u as _}from"./usePriceToTw-9c079645.js";import{u as B}from"./useDispatch-4bd35c40.js";import{I as V}from"./InputGroup-11916bcb.js";import"./react-toastify.esm-dde1cf43.js";import"./iconBase-b99dbde1.js";import"./index.esm-f48ff49b.js";import"./index.esm-709242c1.js";const W=({carts:i,handleFetchCart:l})=>{const n=B(),{handlePriceToTw:p}=_(),[o,h]=g.useState([]),{inputToastMessage:x}=T(),f=async(t,c,a)=>{var d;try{h([...o,t]),await R(t,{product_id:c,qty:a}),h(o.filter(b=>b!==t)),l()}catch(r){x((d=r==null?void 0:r.response)==null?void 0:d.data)}},s=(t,c)=>{m.fire({title:"刪除商品?",text:`確認刪除「${c}」商品請按下確認`,icon:"question",confirmButtonColor:"#111c30",cancelButtonColor:"#b2bec3",confirmButtonText:"確認",cancelButtonText:"取消",showCancelButton:!0,showCloseButton:!0,showLoaderOnConfirm:!0,preConfirm:async()=>{try{return await q(t)}catch(a){m.showValidationMessage(`請求失敗： ${a}`)}},allowOutsideClick:()=>!m.isLoading()}).then(a=>{var d,r;a.isConfirmed&&(m.fire("成功",(r=(d=a==null?void 0:a.value)==null?void 0:d.data)==null?void 0:r.message,"success"),n(P()),n(N()),l())})},u=()=>{m.fire({title:"刪除全部商品?",text:"確認刪除全部商品請按下確認",icon:"question",confirmButtonColor:"#111c30",cancelButtonColor:"#b2bec3",confirmButtonText:"確認",cancelButtonText:"取消",showCancelButton:!0,showCloseButton:!0,showLoaderOnConfirm:!0,preConfirm:async()=>{try{return await O()}catch(t){m.showValidationMessage(`請求失敗： ${t}`)}},allowOutsideClick:()=>!m.isLoading()}).then(t=>{var c,a;t.isConfirmed&&(m.fire("成功",(a=(c=t==null?void 0:t.value)==null?void 0:c.data)==null?void 0:a.message,"success"),n($()),n(N()),l())})};return e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table align-middle ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"商品資料"}),e.jsx("th",{children:"單價"}),e.jsx("th",{children:"數量"}),e.jsx("th",{children:"總額"}),e.jsx("th",{children:e.jsx("button",{type:"button",className:"btn btn-none fw-bolder py-0",onClick:()=>u(),children:"全部刪除"})})]})}),e.jsx("tbody",{className:"table-group-divider",children:i==null?void 0:i.map(t=>{var c,a,d,r,b,k,L;return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"row m-0",children:[e.jsx("div",{className:"col-12 col-lg-4 col-xl-3 d-flex justify-content-start align-items-center p-0 ",children:e.jsx(v,{to:`/products/${t.product_id}`,onClick:j=>j.preventDefault(),className:"cart-img-container",children:e.jsx("img",{src:(c=t==null?void 0:t.product)==null?void 0:c.imageUrl,alt:(a=t==null?void 0:t.product)==null?void 0:a.title,className:"cart-img",title:"回到商品詳情"})})}),e.jsx("div",{className:"col-12 col-lg-8 col-xl-9 p-0",children:e.jsxs("div",{className:"h-100 d-flex justify-content-center align-items-start flex-column position-relative",children:[e.jsxs("h3",{className:"fs-6 m-0 mt-2 pb-lg-1",children:[(d=t==null?void 0:t.product)==null?void 0:d.title,e.jsx(U,{changePosition:" cart-wishlist-icon-position ",product:t.product,id:(r=t==null?void 0:t.product)==null?void 0:r.id})]}),e.jsx("p",{className:"d-none d-md-block fs-7 text-muted text-ellipsis m-0 ",children:(b=t==null?void 0:t.product)==null?void 0:b.content}),e.jsx("span",{className:"pt-2",children:(k=t==null?void 0:t.product)==null?void 0:k.unit})]})})]})}),e.jsx("td",{children:p((L=t==null?void 0:t.product)==null?void 0:L.price)}),e.jsx("td",{children:e.jsx("select",{className:"form-select",value:t.qty,onChange:j=>f(t.id,t.product_id,parseInt(j.target.value)),disabled:o.includes(t.id),style:{minWidth:"80px"},children:[...new Array(20)].map((j,C)=>e.jsx("option",{value:C+1,children:C+1},C))})}),e.jsx("td",{children:p(t==null?void 0:t.total)}),e.jsx("td",{className:"ps-4",children:e.jsx("button",{type:"button",className:"btn btn-none d-flex justify-content-center align-items-center py-2",onClick:()=>{var j;return s(t.id,(j=t==null?void 0:t.product)==null?void 0:j.title)},title:"移除商品",children:e.jsx(E,{className:"cart-icon "})})})]},t.id)})})]})})},G=({carts:i})=>{const{handlePriceToTw:l}=_(),n=w(o=>o.coupon),p=[{title:"總量",text:i==null?void 0:i.length},{title:"總計",text:l(n.total)},{title:"優惠碼",text:n.code?n.code:"未使用"},{title:"運輸 (滿$1000免運費)",text:"$0"}];return e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"border-bottom border-2 border-primary fs-5 py-2 mb-4",children:"訂單摘要"}),p==null?void 0:p.map(o=>e.jsxs("div",{className:`d-flex justify-content-between align-items-center  ${o.title==="運輸 (滿$1000免運費)"?"text-muted text-decoration-line-through":""} `,children:[e.jsx("span",{children:o.title}),e.jsx("span",{children:o.text})]},o.title)),e.jsxs("h5",{className:"d-flex justify-content-between align-items-center border-top border-2 border-primary fs-5 mt-4 pt-4 pb-3",children:[e.jsxs("span",{className:"d-flex align-items-center",children:["訂單總額",n.code?e.jsx("span",{className:"fs-7 fw-normal badge bg-danger ms-1 px-1",children:"已折扣"}):null]}),e.jsx("span",{children:n.finalTotal<n.total?l(n.finalTotal):l(n.total)})]}),e.jsx(v,{role:"button",to:"/cart/checkout",className:`btn btn-primary btn-primary-hover w-100 mb-2 ${n.isLoading?"disabled":""}`,title:"前往結帳",state:{carts:i},children:"前往結帳"}),e.jsxs("div",{className:"border-top border-2 border-primary mt-3 mb-2 pt-3",children:[e.jsx("h5",{className:"fs-5 ",children:"更多資訊請參考以下"}),e.jsx("ul",{children:["訂單摘要優惠碼僅提供狀態提示，商品使用代碼請前往結帳，屆時購物車明細將逐一顯示商品代碼。","在結帳前，請務必仔細核對您的訂單信息，確保一切正確無誤，以免因錯誤信息導致不必要的麻煩。","如果您在購物過程中遇到任何問題或需要幫助，請隨時聯繫我們的客戶支援團隊。","我們為您提供全面的售後服務，包括維修、保固等。您可以在購買後放心享受我們的售後支援。"].map(o=>e.jsx("li",{className:"fs-7 text-muted mt-3",children:o},o))})]})]})},X=({handleFetchCart:i})=>{const l=B(),[n,p]=g.useState(""),o=w(s=>s.coupon),{inputToastMessage:h}=T(),x=()=>{m.fire({title:"清除折扣?",text:"若要清除優惠卷折扣時將會清空購物車，可使用其他優惠覆蓋，確定執行?",icon:"warning",confirmButtonColor:"#111c30",cancelButtonColor:"#b2bec3",confirmButtonText:"確認",cancelButtonText:"取消",showCancelButton:!0,showCloseButton:!0,showLoaderOnConfirm:!0,preConfirm:async()=>{try{return await O()}catch(s){m.showValidationMessage(`請求失敗： ${s}`)}},allowOutsideClick:()=>!m.isLoading()}).then(s=>{var u,t;s.isConfirmed&&(m.fire("成功",(t=(u=s==null?void 0:s.value)==null?void 0:u.data)==null?void 0:t.message,"success"),p(""),l($()),l(N()),i())})},f=async s=>{var u,t,c;try{l(S(!0));const d=await A({code:s}),r={isLoading:!1,isSelected:!0,code:s,finalTotal:(t=(u=d==null?void 0:d.data)==null?void 0:u.data)==null?void 0:t.final_total};l(D(r)),i()}catch(a){h((c=a==null?void 0:a.response)==null?void 0:c.data),l(S(!1))}};return e.jsxs(e.Fragment,{children:[e.jsxs(V,{name:"code",id:"coupon",type:"text",title:"使用優惠碼",groupClass:"mb-3 mt-3 ",labelClass:"form-label d-block",inputClass:"form-control d-inline-block",inputStyle:{width:"200px"},onChange:s=>p(s.target.value),value:o.code?o.code:n,placeholder:"請輸入優惠碼",disabled:!!o.code,children:[e.jsx("button",{type:"button",className:"form-control d-inline-block bg-primary  btn-primary-hover text-white ms-1",style:{width:"100px"},title:"使用優惠碼",value:n,onClick:s=>f(s.target.value),disabled:!!o.code,children:"套用折扣"}),o.code&&e.jsx("button",{type:"button",className:"form-control d-inline-block bg-secondary  btn-primary-hover text-white ms-1",style:{width:"100px"},onClick:()=>x(),children:"清除折扣"})]}),e.jsx("div",{className:" mt-4",children:" 當前可使用優惠卷："}),e.jsx("ul",{className:" mt-1",children:[{name:"新會員折扣優惠",coupon:"20%OFF",date_at:"長期有效"},{name:"舊會員折扣優惠",coupon:"50%OFF",date_at:"3月15日~4月15日"}].map(s=>e.jsx("li",{className:" my-1",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-3 ",children:e.jsx("div",{className:"text-ellipsis align-middle ",children:s.name})}),e.jsx("div",{className:"col-3 ",children:e.jsx("div",{className:"text-ellipsis align-middle ",children:s.coupon})}),e.jsx("div",{className:"col-3 ",children:e.jsx("div",{className:"text-ellipsis align-middle  ",children:s.date_at})}),e.jsx("div",{className:"col-3 ",children:e.jsx("button",{type:"button",className:"btn btn-outline-primary  text-ellipsis py-1",onClick:()=>f(s.coupon),disabled:o.code===s.coupon,children:o.code===s.coupon?"代碼使用中":"使用代碼"})})]})},s.name))})]})},Y="/react-fragrance-dawn/assets/bag-1f050797.png",ce=()=>{const[i,l]=g.useState([]),n=B(),{inputToastMessage:p}=T(),o=w(x=>x.loading),h=async()=>{var x,f,s,u;try{n(y(!0));const t=await I(),{total:c,final_total:a}=(x=t==null?void 0:t.data)==null?void 0:x.data;a<c&&n(F(!0)),n(M({total:c,finalTotal:a})),l((s=(f=t==null?void 0:t.data)==null?void 0:f.data)==null?void 0:s.carts),n(y(!1))}catch(t){p((u=t==null?void 0:t.response)==null?void 0:u.data),n(y(!1))}};return g.useEffect(()=>{h()},[]),e.jsx(e.Fragment,{children:o.isLoading?e.jsx("div",{children:"isLoading"}):i.length?e.jsxs("div",{className:"row mb-3 pb-3",children:[e.jsxs("div",{className:"col-12 col-lg-8 ",children:[e.jsx(W,{carts:i,handleFetchCart:h}),e.jsx("div",{className:"border-top border-2 border-primary mt-4 pt-3 mb-3",children:e.jsx(X,{handleFetchCart:h})})]}),e.jsx("div",{className:"col-12 col-lg-4  border border-2 ",children:e.jsx(G,{carts:i})})]}):e.jsxs("div",{className:"d-flex justify-content-center align-items-center flex-column py-3 mb-3",children:[e.jsx("p",{className:"fs-5 p-0 m-0 mb-3",children:"您的購物車中目前沒有商品。"}),e.jsx("img",{src:Y,alt:"購物車圖片",className:"opacity-50"}),e.jsx(v,{to:"/products",className:"link-primary py-2 mt-2",children:"繼續購物"})]})})};export{ce as default};
