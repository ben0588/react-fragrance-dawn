import{h as C,r as n,j as l}from"./index-be291655.js";import{g as x,T as N,h as P,c as m,E as g,i as v,u as O}from"./TransitionWrapper-22889fd5.js";var d={exports:{}},w="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",_=w,S=_;function R(){}function h(){}h.resetWarningCache=R;var F=function(){function e(o,c,p,u,i,s){if(s!==S){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}e.isRequired=e;function t(){return e}var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:h,resetWarningCache:R};return r.PropTypes=r,r};d.exports=F();var j=d.exports;const f=C(j);function k(e){const t=n.useRef(e);return n.useEffect(()=>{t.current=e},[e]),t}function M(e){const t=k(e);return n.useCallback(function(...r){return t.current&&t.current(...r)},[t])}function q(){const e=n.useRef(!0),t=n.useRef(()=>e.current);return n.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),t.current}const B={[g]:"show",[v]:"show"},E=n.forwardRef(({className:e,children:t,transitionClasses:r={},onEnter:o,...c},p)=>{const u={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,...c},i=n.useCallback((s,a)=>{x(s),o==null||o(s,a)},[o]);return l.jsx(N,{ref:p,addEndListener:P,...u,onEnter:i,childRef:t.ref,children:(s,a)=>n.cloneElement(t,{...a,className:m("fade",e,t.props.className,B[s],r[s])})})});E.displayName="Fade";const z=E,W={"aria-label":f.string,onClick:f.func,variant:f.oneOf(["white"])},y=n.forwardRef(({className:e,variant:t,"aria-label":r="Close",...o},c)=>l.jsx("button",{ref:c,type:"button",className:m("btn-close",t&&`btn-close-${t}`,e),"aria-label":r,...o}));y.displayName="CloseButton";y.propTypes=W;const A=y;var U=/-(.)/g;function I(e){return e.replace(U,function(t,r){return r.toUpperCase()})}const $=e=>e[0].toUpperCase()+I(e).slice(1);function G(e,{displayName:t=$(e),Component:r,defaultProps:o}={}){const c=n.forwardRef(({className:p,bsPrefix:u,as:i=r||"div",...s},a)=>{const T={...o,...s},b=O(u,e);return l.jsx(i,{ref:a,className:m(p,b),...T})});return c.displayName=t,c}function D(e){const t=n.useRef(e);return t.current=e,t}function V(e){const t=D(e);n.useEffect(()=>()=>t.current(),[])}export{A as C,z as F,V as a,M as b,G as c,q as u};