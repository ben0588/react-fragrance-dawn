import{r as l,j as e,u as P,m}from"./index-b97d372a.js";import{M as w,D as E}from"./DeleteModal-0f7b49d8.js";import{h as I,i as T,j as R,k as A}from"./adminApis-eb76a048.js";import{P as O}from"./Pagination-4f25c193.js";import{I as j}from"./InputGroup-519968bd.js";import{u as v}from"./useMessage-e2008019.js";import{u as L}from"./useDispatch-da6d43ad.js";import"./react-toastify.esm-1af171fe.js";const V=({handleCancelCouponModal:i,fetchCoupons:g,modalOpenType:o,editCouponTarget:p})=>{const h={title:"",is_enabled:0,percent:"",due_date:new Date().toISOString().split("T")[0],code:""},[s,c]=l.useState(h),{inputToastMessage:f}=v();l.useEffect(()=>{o==="create"?c(h):o==="edit"&&c({...p,due_date:new Date(p.due_date).toISOString().split("T")[0]})},[o,p]);const d=r=>{const{name:a,value:n}=r.target;a==="percent"?n<=0?c({...s,[a]:0}):c({...s,[a]:parseInt(n)}):c(a==="is_enabled"?{...s,[a]:+r.target.checked}:a==="due_date"?{...s,[a]:new Date(n).toISOString().split("T")[0]}:{...s,[a]:n})},C=async()=>{const r={...s,due_date:new Date(s.due_date).getTime()};try{let a=o==="create",n;a?n=await I(r):n=await T(r,r.id),f(n),g(),i()}catch(a){f(a.response.data),i()}};return e.jsx("div",{className:"modal fade",id:"couponModal",children:e.jsx("div",{className:"modal-dialog modal-lg",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title fw-bolder",children:o==="create"?"新增優惠卷":`編輯優惠卷：${p.title}`}),e.jsx("button",{type:"button",className:"btn-close",onClick:()=>i(),"aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"",children:[e.jsx(j,{name:"title",id:"couponTitle",type:"text",title:"標題",groupClass:"mb-3",labelClass:"form-label fw-bolder",inputClass:"form-control",onChange:d,value:s.title||"",placeholder:"請輸入標題"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsx(j,{name:"percent",id:"couponPercent",type:"number",title:"折扣 (%)",groupClass:"mb-3",labelClass:"form-label fw-bolder",inputClass:"form-control",onChange:d,value:s.percent||"",placeholder:"請輸入折扣 (%)"})}),e.jsx("div",{className:"col-6",children:e.jsx(j,{name:"due_date",id:"couponDueDate",type:"date",title:"到期日",groupClass:"mb-3",labelClass:"form-label fw-bolder",inputClass:"form-control",onChange:d,value:s.due_date||""})}),e.jsx("div",{className:"col-6 mt-0",children:e.jsx(j,{name:"code",id:"couponCode",type:"text",title:"優惠碼",groupClass:"mb-3",labelClass:"form-label fw-bolder",inputClass:"form-control",onChange:d,value:s.code||"",placeholder:"請輸入優惠碼"})}),e.jsx("div",{className:"col-12 mt-0",children:e.jsx(j,{name:"is_enabled",id:"couponEnabled",type:"checkbox",title:"是否啟用",groupClass:"form-check mb-3",labelClass:"form-check-label",inputClass:"form-check-input",onChange:d,checked:!!s.is_enabled})})]})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>i(),children:"關閉"}),e.jsx("button",{type:"button",className:"btn btn-primary ",onClick:()=>C(),children:o==="create"?"新增":"儲存"})]})]})})})},K=()=>{const[i,g]=l.useState([]),[o,p]=l.useState({}),h=l.useRef(null),s=l.useRef(null),[c,f]=l.useState("create"),[d,C]=l.useState({}),[r,a]=l.useState({}),{inputToastMessage:n}=v(),u=L();P(t=>t.loading),l.useEffect(()=>{h.current=new w("#couponModal",{backdrop:"static"}),s.current=new w("#deleteModal",{backdrop:"static"})},[]);const y=(t,x)=>{f(t),C(x),h.current.show()},_=()=>h.current.hide(),S=t=>{a(t),s.current.show()},N=()=>s.current.hide(),b=l.useCallback(async(t=1)=>{try{u(m(!0));const x=await R(t),{coupons:k,pagination:D}=x;g(k),p(D),u(m(!1))}catch(x){n(x.response.data),u(m(!1))}},[]);l.useEffect(()=>{b()},[b]);const M=async()=>{try{u(m(!0));const t=await A(r.id);n(t),b(),a({}),N(),u(m(!1))}catch(t){n(t.response.data),N(),u(m(!1))}};return e.jsxs("div",{className:"p-3",children:[e.jsx(V,{handleCancelCouponModal:_,fetchCoupons:b,modalOpenType:c,editCouponTarget:d}),e.jsx(E,{handleCancelDeleteModal:N,handleDelete:M,title:r.title}),e.jsx("h3",{children:"優惠卷列表"}),e.jsx("hr",{}),e.jsx("div",{className:"text-end",children:e.jsx("button",{type:"button",className:"btn btn-primary",onClick:()=>y("create",{}),children:"建立新優惠卷"})}),e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"標題"}),e.jsx("th",{scope:"col",children:"折扣比(%)"}),e.jsx("th",{scope:"col",children:"到期日"}),e.jsx("th",{scope:"col",children:"優惠碼"}),e.jsx("th",{scope:"col",children:"啟用狀態"}),e.jsx("th",{scope:"col",children:"編輯"})]})}),e.jsx("tbody",{children:i==null?void 0:i.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.title}),e.jsx("td",{children:t.percent}),e.jsx("td",{children:new Date(t.due_date).toISOString().split("T")[0]}),e.jsx("td",{children:t.code}),e.jsx("td",{className:`${t.is_enabled?"text-success ":""}`,children:t.is_enabled?"啟用":"未啟用"}),e.jsxs("td",{children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-sm",onClick:()=>y("edit",t),children:"編輯"}),e.jsx("button",{type:"button",className:"btn btn-outline-danger btn-sm ms-2",onClick:()=>S(t),children:"刪除"})]})]},t.id))})]}),e.jsx(O,{changePage:b,totalPage:o.total_pages,currentPage:o.current_page,isPre:o.has_pre,isNext:o.has_next})]})};export{K as default};