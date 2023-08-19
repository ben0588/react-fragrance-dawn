import{j as t,r as c,u as M,m as o}from"./index-a82e94e2.js";import{n as B,m as L}from"./clientApis-c61faaa3.js";import{P as k}from"./Pagination-cb41b2b0.js";import{u as D}from"./usePriceToTw-fb6ba16b.js";import{M as u,A,B as P}from"./AccountOrderModal-d08d2e28.js";import{u as F,V}from"./ValidationSelectGroup-95acf37a.js";import{u as E}from"./useMessage-d281c1da.js";import{u as H}from"./useDispatch-d77d5323.js";import"./TransitionWrapper-831bfbfd.js";import"./setPrototypeOf-72fdee31.js";import"./useWillUnmount-3a05f81b.js";import"./react-toastify.esm-a149caf8.js";const $=({show:d,handleClose:p,order:l,handlePaymentOrder:j})=>{const{register:g,handleSubmit:h,formState:{errors:f},reset:m}=F({defaultValues:{paymentMethod:""},mode:"onTouched"}),y=[{text:"信用卡一次付清"},{text:"信用卡分期"},{text:"信用卡紅利折抵"},{text:"行動支付"},{text:"ATM轉帳(4小時內付款)"},{text:"超商付款"},{text:"中租銀角零卡"},{text:"銀聯卡"}],a=async n=>{j(l.id,n),m()};return t.jsxs(u,{show:d,onHide:p,children:[t.jsx(u.Header,{closeButton:!0,children:t.jsxs(u.Title,{children:["訂單付款：",l.id]})}),t.jsx(u.Body,{children:t.jsxs("form",{onSubmit:h(a),children:[t.jsxs(V,{id:"paymentMethod",labelText:"付款方式",groupClass:"py-2",labelClass:"form-label mb-1",selectClass:"form-control",errors:f,register:g,rules:{required:{value:!0,message:"必須選擇付款方式"}},defaultValue:"",children:[t.jsx("option",{className:"bg-dark text-white",value:"",children:"請選擇付款方式"}),y.map(n=>t.jsx("option",{value:n.text,className:"bg-dark text-white",children:n.text},n.text))]}),t.jsx("input",{type:"submit",value:"付款",className:"btn btn-primary btn-primary-hover float-end",style:{width:"80px"}})]})})]})},Z=()=>{const[d,p]=c.useState([]),[l,j]=c.useState({}),{handlePriceToTw:g}=D(),{inputToastMessage:h}=E(),[f,m]=c.useState(!1),y=M(e=>e.loading),a=H(),[n,w]=c.useState([]),v=()=>m(!1),N=e=>{w(e),m(!0)},[T,S]=c.useState(!1),_=()=>S(!1),C=e=>{w(e),S(!0)},x=c.useCallback(async(e=0)=>{var b,r,i;try{a(o(!0));const s=await B(e);p((b=s==null?void 0:s.data)==null?void 0:b.orders),j((r=s==null?void 0:s.data)==null?void 0:r.pagination),a(o(!1))}catch(s){h((i=s==null?void 0:s.response)==null?void 0:i.data),a(o(!1))}},[]);c.useEffect(()=>{x()},[x]);const O=async(e,b)=>{var r;try{a(o(!0));const i=await L(e);h(i.data),x(),S(!1),a(o(!1))}catch(i){h((r=i==null?void 0:i.response)==null?void 0:r.data),a(o(!1))}};return t.jsxs("div",{className:"container  ",children:[t.jsx(A,{show:f,handleClose:v,order:n}),t.jsx($,{show:T,handleClose:_,order:n,handlePaymentOrder:O}),y.isLoading?t.jsx("div",{children:"isLoading 加載中"}):d.length?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"table-responsive my-3",children:[t.jsx("h4",{className:"fw-bolder",children:"訂單列表"}),t.jsx("hr",{}),t.jsxs("table",{className:"table align-middle",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"訂單日期"}),t.jsx("th",{children:"訂單編號"}),t.jsx("th",{children:"訂單金額"}),t.jsx("th",{children:"付款狀態"}),t.jsx("th",{children:"付款日期"}),t.jsx("th",{children:"訂單資訊"}),t.jsx("th",{children:"操作"})]})}),t.jsx("tbody",{children:d.length&&d.map(e=>t.jsxs("tr",{children:[t.jsx("td",{children:new Date(e.create_at*1e3).toLocaleString(void 0,{year:"numeric",month:"long",day:"numeric"})}),t.jsx("td",{children:e.id}),t.jsxs("td",{children:["NT",g(e.total)]}),t.jsx("td",{className:`${e.is_paid?"text-success ":""}`,children:e.is_paid?"已付款":"未付款"}),t.jsx("td",{children:e.paid_date?new Date(e.paid_date*1e3).toLocaleString(void 0,{year:"numeric",month:"long",day:"numeric"}):"未付款"}),t.jsx("td",{children:t.jsx(P,{variant:"light",onClick:()=>N(e),children:"查看"})}),t.jsx("td",{className:`${e.is_paid?(e==null?void 0:e.status)==="1"?"text-dark":(e==null?void 0:e.status)==="2"?"text-warning":(e==null?void 0:e.status)==="3"?"text-success":"text-secondary":""}`,children:e.is_paid?(e==null?void 0:e.status)==="1"?"已確認":(e==null?void 0:e.status)==="2"?"寄送中":(e==null?void 0:e.status)==="3"?"已送達":"未確認":t.jsx(P,{variant:"primary",onClick:()=>C(e),children:"付款"})})]},e.id))})]})]}),t.jsx(k,{changePage:x,totalPage:l.total_pages,currentPage:l.current_page,isPre:l.has_pre,isNext:l.has_next})]}):t.jsx("div",{children:"尚無訂單"})]})};export{Z as default};