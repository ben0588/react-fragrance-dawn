import{u as n,j as s,a as i}from"./index-131eb30e.js";import{u as l}from"./useMessage-aafe73ad.js";import{u as p}from"./useDispatch-4bd35c40.js";import"./react-toastify.esm-dde1cf43.js";const d=()=>{const o=p(),e=n(a=>a.bulletin),{inputToastMessage:t}=l();return s.jsxs("div",{className:"p-3 mb-3",children:[s.jsx("h4",{className:"fw-bolder pb-0",children:"帳戶中心"}),s.jsx("hr",{}),s.jsx("p",{children:"親愛的會員 XXX 你好，歡迎回來​！"}),s.jsx("hr",{}),s.jsxs("div",{className:"mb-2",children:["公告開啟狀態：",e.open?"開啟中":"關閉中"]}),s.jsx("div",{children:e.open?"感謝您的支持，請留意更多優惠通知！":"可開啟接受更多優惠訊息與通知，謝謝！"}),s.jsx("button",{type:"button",className:"btn btn-dark mt-2",onClick:()=>{o(i(!e.open)),e.open?t({success:!0,type:"default",message:"🌪️ 關閉通知成功",position:"top-left"}):t({success:!0,type:"default",message:"🌞 開啟通知成功",position:"top-left"})},children:e.open?"關閉通知":"開啟通知"})]})};export{d as default};
