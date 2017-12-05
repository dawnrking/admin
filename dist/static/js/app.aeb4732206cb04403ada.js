webpackJsonp([16],{1:function(e,n,t){e.exports=t(28)(11)},118:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),t(157),t(155),t(156),window.Quill||(window.Quill=t(67)),n.default={name:"quill-editor",data:function(){return{_content:"",defaultModules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]}}},props:{content:String,value:String,disabled:Boolean,options:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null},methods:{initialize:function(){if(this.$el){var e=this;e.options.theme=e.options.theme||"snow",e.options.boundary=e.options.boundary||document.body,e.options.modules=e.options.modules||e.defaultModules,e.options.modules.toolbar=void 0!==e.options.modules.toolbar?e.options.modules.toolbar:e.defaultModules.toolbar,e.options.placeholder=e.options.placeholder||"Insert text here ...",e.options.readOnly=void 0!==e.options.readOnly&&e.options.readOnly,e.quill=new Quill(e.$refs.editor,e.options),(e.value||e.content)&&e.quill.pasteHTML(e.value||e.content),e.quill.on("selection-change",function(n){n?e.$emit("focus",e.quill):e.$emit("blur",e.quill)}),e.quill.on("text-change",function(n,t,i){var a=e.$refs.editor.children[0].innerHTML,o=e.quill.getText();"<p><br></p>"===a&&(a=""),e._content=a,e.$emit("input",e._content),e.$emit("change",{editor:e.quill,html:a,text:o})}),this.disabled&&this.quill.enable(!1),e.$emit("ready",e.quill)}}},watch:{content:function(e,n){this.quill&&(e&&e!==this._content?(this._content=e,this.quill.pasteHTML(e)):e||this.quill.setText(""))},value:function(e,n){this.quill&&(e&&e!==this._content?(this._content=e,this.quill.pasteHTML(e)):e||this.quill.setText(""))},disabled:function(e,n){this.quill&&this.quill.enable(!e)}}}},119:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"app"}},120:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(1),a=t(86),o=t.n(a),l=t(69),u=t(52),r=t.n(u),c=t(85),s=t.n(c),d=t(83),p=(t.n(d),t(84)),f=(t.n(p),t(46)),h=t.n(f),m=t(12),_=t.n(m),b=t(76),g=t.n(b),v=t(75),x=t.n(v),y=t(79),q=t.n(y),$=t(78),w=t.n($),k=t(74),M=t.n(k),T=t(48),z=t.n(T),O=t(47),j=t.n(O),H=t(71),L=t.n(H),P=t(72),Q=t.n(P),A=t(49),E=t.n(A),F=t(82),R=t.n(F),S=t(77),B=t.n(S),C=t(81),D=t.n(C),I=t(80),J=t.n(I),G=t(70),K=t.n(G),N=t(73),U=t.n(N),V=t(55),W=t.n(V);i.default.use(W.a),i.default.use(s.a),i.default.config.productionTip=!1,i.default.use(h.a),i.default.use(_.a),i.default.use(g.a),i.default.use(x.a),i.default.use(q.a),i.default.use(w.a),i.default.use(M.a),i.default.use(z.a),i.default.use(j.a),i.default.use(L.a),i.default.use(Q.a),i.default.use(E.a),i.default.use(R.a),i.default.use(B.a),i.default.use(U.a),i.default.use(K.a),i.default.prototype.$message=D.a,i.default.prototype.$alert=J.a.alert,i.default.prototype.$prompt=J.a.prompt,i.default.prototype.$confirm=J.a.confirm,new i.default({el:"#app",router:l.a,axios:r.a,template:"<App/>",components:{App:o.a}})},155:function(e,n){},156:function(e,n){},157:function(e,n){},158:function(e,n){},159:function(e,n){},163:function(e,n,t){function i(e){t(159)}var a=t(50)(t(118),t(165),i,null,null);e.exports=a.exports},164:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]}},165:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"quill-editor"},[e._t("toolbar"),e._v(" "),t("div",{ref:"editor"})],2)},staticRenderFns:[]}},167:function(e,n,t){e.exports=t(28)(10)},28:function(e,n){e.exports=vendor_library},52:function(e,n,t){e.exports=t(28)(9)},68:function(e,n,t){e.exports=t(28)(8)},69:function(e,n,t){"use strict";var i=t(1),a=t(167);i.default.use(a.default),n.a=new a.default({routes:[{path:"/",redirect:{name:"login"}},{path:"/login",name:"login",component:function(e){return t.e(13).then(function(){var n=[t(183)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index",name:"index",component:function(e){return t.e(12).then(function(){var n=[t(182)];e.apply(null,n)}.bind(this)).catch(t.oe)},redirect:{name:"item_manage"},children:[{path:"/index/item_manage",name:"item_manage",component:function(e){return t.e(0).then(function(){var n=[t(95)];e.apply(null,n)}.bind(this)).catch(t.oe)},redirect:{name:"item_list"},children:[{path:"/index/item_manage/list",name:"item_list",component:function(e){return t.e(2).then(function(){var n=[t(176)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/item_manage/:id",name:"item_process",component:function(e){return t.e(1).then(function(){var n=[t(177)];e.apply(null,n)}.bind(this)).catch(t.oe)}}]},{path:"/index/feedback_manage",name:"feedback_manage",component:function(e){return t.e(11).then(function(){var n=[t(172)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/ad_manage",name:"ad_manage",component:function(e){return t.e(8).then(function(){var n=[t(170)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/article_manage",name:"article_manage",component:function(e){return t.e(7).then(function(){var n=[t(171)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/item_manage",name:"item_manage",component:function(e){return t.e(0).then(function(){var n=[t(95)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/info_manage",name:"info_manage",component:function(e){return t.e(6).then(function(){var n=[t(175)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/user_manage",name:"user_manage",component:function(e){return t.e(9).then(function(){var n=[t(181)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/order_manage",name:"order_manage",component:function(e){return t.e(14).then(function(){var n=[t(179)];e.apply(null,n)}.bind(this)).catch(t.oe)},redirect:{name:"order_list"},children:[{path:"/index/order_manage/list",name:"order_list",component:function(e){return t.e(10).then(function(){var n=[t(178)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/order_manage/:id",name:"service_manage",component:function(e){return t.e(5).then(function(){var n=[t(180)];e.apply(null,n)}.bind(this)).catch(t.oe)}}]},{path:"/index/generalize_manage/person",name:"generalize_person",component:function(e){return t.e(4).then(function(){var n=[t(173)];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/index/generalize_manage/work",name:"generalize_work",component:function(e){return t.e(3).then(function(){var n=[t(174)];e.apply(null,n)}.bind(this)).catch(t.oe)}}]}]})},83:function(e,n){},84:function(e,n){},86:function(e,n,t){function i(e){t(158)}var a=t(50)(t(119),t(164),i,null,null);e.exports=a.exports}},[120]);
//# sourceMappingURL=app.aeb4732206cb04403ada.js.map