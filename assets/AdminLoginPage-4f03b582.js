import{r,d as f,j as e,i as x,e as d}from"./index-131eb30e.js";import{a as b}from"./adminApis-f48c2cee.js";import{u as h}from"./useDispatch-4bd35c40.js";const N=()=>{const i=r.useRef(null),o=r.useRef(null),l=r.useRef(null),c=f(),n=h(),u=async t=>{var m;try{t.preventDefault();const s={username:o.current.value,password:l.current.value},a=await b(s);i.current.reset();let p=new Date(a.expired).toLocaleString();document.cookie=`adminToken=${a.token}; expires=${p};`,n(x({...a,expired:a.expired})),n(d(a)),document.cookie&&c("/admin/dashboard")}catch(s){n(d((m=s==null?void 0:s.response)==null?void 0:m.data))}};return e.jsx("div",{className:"position-relative ",children:e.jsx("form",{className:" mx-auto my-5",style:{width:"40%"},onSubmit:t=>u(t),ref:i,children:e.jsxs("fieldset",{children:[e.jsx("legend",{className:"fs-3 fw-bolder mb-4",children:"管理者登入介面"}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"adminLogin-account",className:"form-label fw-bolder mb-0",children:"管理者帳號"}),e.jsx("input",{type:"text",name:"username",className:"form-control",id:"adminLogin-account",ref:o,defaultValue:""})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"adminLogin-password",className:"form-label fw-bolder mb-0",children:"管理者密碼"}),e.jsx("input",{name:"password",type:"password",className:"form-control",id:"adminLogin-password",ref:l,defaultValue:""})]}),e.jsx("button",{type:"submit",className:" btn btn-primary w-25 mt-2",children:"登入"})]})})})};export{N as default};
