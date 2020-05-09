(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{105:function(e,t){},106:function(e,t){},111:function(e,t,a){},112:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),o=a.n(l),c=a(11),i={defaultIntent:"WELCOME",title:"ClaimBot",agentId:window.DIALOGFLOW_AGENT_ID||"ce617fac-032a-442b-8976-36b110b58133"},s={host:window.API_HOST||"http://"+window.location.hostname+":5000"},u={host:window.CLAIM_REPO_API_HOST||"http://"+window.location.hostname+":8081"},d=a(14),m=a(26),p="SET_DIALOG_FLOW_SESSION_ID",f="ADD_TO_DIALOG_FLOW_MESSAGE_QUEUE",h="ADD_TOAST_MESSAGE",g="CLEAR_TOAST_MESSAGES",E=a(20),b=a.n(E),v={dialogFlowSessionId:"",dialogFlowMessageQueue:[],toastMessages:[]},y=Object(n.createContext)(v),O=y.Provider,w=function(e){var t=e.children,a=Object(n.useReducer)((function(e,t){switch(t.type){case g:return Object(m.a)({},e,{toastMessages:[]});case h:return Object(m.a)({},e,{toastMessages:[].concat(Object(d.a)(e.toastMessages),[t.payload])});case f:return Object(m.a)({},e,{dialogFlowMessageQueue:[].concat(Object(d.a)(e.dialogFlowMessageQueue),Object(d.a)(t.payload))});case p:if(e.dialogFlowSessionId!==t.payload)return b.a.interceptors.request.use((function(e){return e.headers=Object(m.a)({},e.headers,{Dfsessionid:t.payload}),e}),(function(e){return Promise.reject(e)})),Object(m.a)({},e,{dialogFlowSessionId:t.payload});break;default:return e}}),v),l=Object(c.a)(a,2),o=l[0],i=l[1];return r.a.createElement(O,{value:{state:o,dispatch:i}},t)};function j(e){var t=e.handleUploadTriggered,a=void 0===t?function(){}:t,n=e.handleLoadFailed,l=void 0===n?function(){}:n,o=r.a.useContext(y),c=o.state,s=o.dispatch,u=r.a.useRef(null),d=r.a.useRef(null),m=c.dialogFlowMessageQueue;r.a.useEffect((function(){if(!d.current){var e=document.createElement("df-messenger");e.setAttribute("intent",i.defaultIntent),e.setAttribute("chat-title",i.title),e.setAttribute("agent-id",i.agentId),e.setAttribute("language-code","en"),d.current=e}if(!u.current){var t=document.createElement("script");t.onerror=l,t.setAttribute("src","https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"),u.current=t}document.body.appendChild(d.current),document.head.appendChild(u.current),d.current.addEventListener("df-response-received",(function(e){e.detail.response.queryResult.fulfillmentMessages.forEach((function(e){f(e)}))}))}),[]),r.a.useEffect((function(){d.current&&d.current.sessionId&&s({type:p,payload:d.current.sessionId})}),[d.current?d.current.sessionId:null]),r.a.useEffect((function(){m.forEach((function(e){d.current.renderCustomText(e)}))}),[m.join(",")]);var f=function(e){var t=e.payload,n=void 0===t?null:t;if(n)switch(n.action){case"fileUpload":a(n.parameters.type)}};return null}var C=a(32),S=a.n(C),I=a(40),k=a(133),x=a(150),A=a(135),F=a(136),_=a(149),M=a(37),T=a(151),D=a(139),N=a(141),L=a(142),R=a(143),W=a(69),U=a(137),G=a(140);function B(e,t){var a=new FormData;return a.append("file",t),a.append("type",e),b.a.post("".concat(s.host,"/claim/uploadfile"),a,{headers:{"Content-Type":"multipart/form-data"}})}var P=Object(k.a)((function(e){return{fileContainer:{height:200,backgroundColor:e.palette.grey[100]},dropZone:{height:"100%","& h4":Object(m.a)({},e.typography.body1)},uploadedFile:{height:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center","& > *":{marginRight:e.spacing(1),"&:last-child":{marginRight:0}}},loading:{marginLeft:e.spacing(1)}}}));function Q(e){var t=e.open,a=void 0!==t&&t,n=e.uploadFileType,l=void 0===n?"hospitalBill":n,o=e.handleClose,i=void 0===o?function(){}:o,s=e.handleUploadComplete,u=void 0===s?function(e){}:s,d=P({}),m=r.a.useState(null),p=Object(c.a)(m,2),f=p[0],g=p[1],E=r.a.useState(!1),b=Object(c.a)(E,2),v=b[0],O=b[1],w=r.a.useContext(y).dispatch;r.a.useEffect((function(){a&&g(null)}),[a]);var j=function(){var e=Object(I.a)(S.a.mark((function e(){var t,a;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,O(!0),e.next=6,B(l,f);case 6:t=e.sent,a=t.data,u(a),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),w({type:h,payload:"Error uploading file"}),console.error(e.t0);case 15:return e.prev=15,O(!1),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[2,11,15,18]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(x.a,{open:a,onClose:i,fullWidth:!0},r.a.createElement(A.a,null,"Upload Bill"),r.a.createElement(F.a,null,r.a.createElement(_.a,{className:d.fileContainer},f?r.a.createElement(_.a,{className:d.uploadedFile},r.a.createElement(U.a,null),r.a.createElement(M.a,null,f.name),r.a.createElement(T.a,{title:"Remove"},r.a.createElement(D.a,{color:"secondary",onClick:function(){return g(null)}},r.a.createElement(G.a,null)))):r.a.createElement(W.a,{acceptedMimeTypes:["image/png","image/jpg","image/jpeg","image/gif","image/bmp"],onFilesAdded:function(e){e[0]?g(e[0]):g(null)},onFilesRejected:function(e){g(null),w({type:h,payload:"This file type is not allowed"})},blockOtherDrops:!0,className:d.dropZone})),r.a.createElement("br",null),r.a.createElement(M.a,{variant:"caption"},"*Supported file formats: png, jpg, gif, and bmp")),r.a.createElement(N.a,null,r.a.createElement(L.a,{color:"secondary",onClick:i},"Cancel"),r.a.createElement(L.a,{color:"primary",variant:"contained",disabled:!f||v,onClick:j},"Submit",v&&r.a.createElement(R.a,{color:"",size:10,className:d.loading}))))}var H=a(146),q=a(152),z=a(147),J=a(144),Z=a(145);var $=Object(k.a)((function(e){return{root:{display:"flex",flexDirection:"row",alignItems:"stretch",justifyContent:"center"},container:{margin:e.spacing(2)}}})),K=function(){var e=$({}),t=Object(n.useState)(!1),a=Object(c.a)(t,2),l=a[0],o=a[1],i=Object(n.useState)(null),s=Object(c.a)(i,2),d=s[0],m=s[1],p=Object(n.useState)([]),f=Object(c.a)(p,2),h=f[0],g=f[1],E=Object(n.useState)([]),v=Object(c.a)(E,2),y=v[0],O=v[1];Object(n.useEffect)((function(){w()}),[]);var w=function(){var e=Object(I.a)(S.a.mark((function e(){var t,a,n,r;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o(!0),e.next=4,Promise.all([b.a.get("".concat(u.host,"/healthpolicy/sampleids?limit=100")),b.a.get("".concat(u.host,"/medicalpanel?limit=50&offset=1000"))]);case 4:t=e.sent,a=Object(c.a)(t,2),n=a[0],r=a[1],g(n.data.data),O(r.data.data.map((function(e){return e.RegistrationNo}))),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:return e.prev=15,o(!1),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[0,12,15,18]])})));return function(){return e.apply(this,arguments)}}();return l?r.a.createElement("div",{style:{margin:"10px auto 10px auto"}},r.a.createElement(R.a,null)):r.a.createElement(_.a,{className:e.root},r.a.createElement(_.a,{className:e.container},r.a.createElement(L.a,{variant:"contained",startIcon:r.a.createElement(J.a,null),onClick:function(){return window.open("/bill-sample.zip")}},"Sample Bills")),r.a.createElement(_.a,{className:e.container},r.a.createElement(L.a,{variant:"contained",startIcon:r.a.createElement(Z.a,null),onClick:function(){return m("ids")}},"Sample NRIC")),r.a.createElement(_.a,{className:e.container},r.a.createElement(L.a,{variant:"contained",startIcon:r.a.createElement(Z.a,null),onClick:function(){return m("specialists")}},"Sample Specialist")),r.a.createElement(x.a,{open:null!==d,fullWidth:!0,maxWidth:"sm"},r.a.createElement(A.a,null,!!d&&("ids"===d?"Sample NRICs":"Sample Specialists")),r.a.createElement(F.a,null,r.a.createElement(H.a,null,!!d&&("ids"===d?h:y).map((function(e,t){return r.a.createElement(q.a,{key:t},r.a.createElement(z.a,null,e))})))),r.a.createElement(N.a,null,r.a.createElement(L.a,{onClick:function(){return m(null)}},"Close"))))},V=a(153),X=a(148);function Y(){var e=r.a.useContext(y),t=e.state,a=e.dispatch,n=r.a.useState(!1),l=Object(c.a)(n,2),o=l[0],i=l[1],s=t.toastMessages;r.a.useEffect((function(){i(!0)}),[s.join(",")]);var u=function(){i(!1),a({type:g})};return r.a.createElement(r.a.Fragment,null,s.map((function(e,t){return r.a.createElement(V.a,{open:o,autoHideDuration:6e3,onClose:u,key:t},r.a.createElement(X.a,{style:{backgroundColor:"rgb(220, 0, 78)"},message:e}))})))}a(111);var ee=function(){var e=r.a.useContext(y),t=(e.state,e.dispatch),a=r.a.useState(!1),n=Object(c.a)(a,2),l=n[0],o=n[1],i=r.a.useState(),s=Object(c.a)(i,2),u=s[0],d=s[1];return r.a.createElement("div",{className:"App"},r.a.createElement(Y,null),r.a.createElement("div",{style:{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}},r.a.createElement(M.a,{variant:"h5",style:{color:"#505050",fontWeight:100}},l?"Dialogflow failed to load. If you are currently offline, please use the dashboard to submit claims instead.":r.a.createElement(r.a.Fragment,null,"To start, please talk to the chatbot at the bottom right of the screen.",r.a.createElement("br",null),"Here are some sample data to help you along.",r.a.createElement(K,null)))),r.a.createElement(j,{handleUploadTriggered:function(e){d(e)},handleLoadFailed:function(){o(!0)}}),r.a.createElement(Q,{open:!!u,uploadFileType:u,handleClose:function(){d("")},handleUploadComplete:function(e){d(""),t({type:f,payload:[e.fulfillmentMessages]})}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null,r.a.createElement(ee,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},64:function(e,t){},79:function(e,t,a){e.exports=a(112)}},[[79,1,2]]]);
//# sourceMappingURL=main.776365d9.chunk.js.map