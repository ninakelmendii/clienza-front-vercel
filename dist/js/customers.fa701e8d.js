"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[7],{4674:function(t,e,s){s.d(e,{Z:function(){return Z}});var r=s(8819),a=s(7179),o=s(4437),n=s(5057),l=s(2469),i=s(248),c=s(1908),u=s(1495),g=function(){var t=this,e=t._self._c;return e(o.Z,{attrs:{cols:"12",md:"12",lg:"12"}},[e("div",{staticClass:"second-sidebar-header",staticStyle:{padding:"0"}},[e(n.Z,{directives:[{name:"show",rawName:"v-show",value:t.isMobile,expression:"isMobile"}],on:{click:function(e){return t.$store.dispatch("toggleSecondVariant")}}},[t._v("mdi-arrow-collapse-right")]),e("div",[e("button",{staticClass:"border-blue",staticStyle:{overflow:"hidden",cursor:"pointer"},on:{click:function(e){return t.$store.dispatch("toggleLanguage")}}},["german"==t.$store.state.language?e("div",{staticClass:"center"},[e("img",{staticStyle:{width:"24px",height:"24px","object-fit":"cover","border-radius":"999px"},attrs:{src:s(1635),alt:"german language"}}),t._v(" CH ")]):e("div",{staticClass:"center"},[e("img",{staticStyle:{width:"24px",height:"24px","border-radius":"999px","object-fit":"cover"},attrs:{src:s(5257),alt:"german language"}}),t._v(" EN ")])]),e(u.Z,{attrs:{"offset-y":"",left:"",bottom:"",transition:"slide-x-transition"},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:o}){return[e(r.Z,t._g(t._b({attrs:{size:"35"}},"v-avatar",o,!1),a),[t.$store.state.profileImage.img_path?e("img",{staticClass:"pa-1",staticStyle:{"object-fit":"contain"},attrs:{src:t.$store.state.profileImage.img_path}}):e(l.Z,{attrs:{src:s(6164)}})],1)]}}])},[e(i.Z,{staticClass:"p-0"},[e(c.Z,{staticClass:"p-0"},[e(a.Z,{staticStyle:{background:"transparent"},on:{click:t.goToProfile}},[t._v(" "+t._s(t.translate("Profile"))+" ")])],1),e(c.Z,{staticClass:"p-0"},[e(a.Z,{staticStyle:{background:"transparent"},on:{click:t.exitApp}},[t._v(t._s(t.translate("Log out")))])],1)],1)],1)],1)],1)])},m=[],p=(s(7658),s(4069)),d=s.t(p,2),f={name:"UserControl",methods:{translate(t){let e=null;return p.forEach(((s,r)=>{s.english.toLowerCase()==t.toLowerCase()&&(e=r)})),null===e?t:"german"==this.$store.state.language?d[e].german:d[e].english},goToProfile(){this.$router.push("/profile")},exitApp(){localStorage.removeItem("token"),localStorage.removeItem("user"),this.$router.push("/login")}}},h=f,C=s(3736),v=(0,C.Z)(h,g,m,!1,null,null,null),Z=v.exports},5161:function(t,e,s){s.r(e),s.d(e,{default:function(){return w}});var r=function(){var t=this,e=t._self._c;return e("Customers")},a=[],o=s(4437),n=s(6035),l=s(5294),i=function(){var t=this,e=t._self._c;return e(n.Z,[e(l.Z,[e(o.Z,{attrs:{cols:"12",md:"12",lg:"12"}},[e(l.Z,[e(l.Z,{staticStyle:{"margin-left":"12px"}},[e(o.Z,{staticClass:"d-flex justify-start",attrs:{cols:"12",md:"8"}},[e("NavbarControl"),e("h2",{staticStyle:{display:"flex","align-items":"center"}},[t._v(t._s(t.translate(t.title)))])],1),e(o.Z,{attrs:{cols:"12",md:"4"}},[e("UserControl")],1)],1),e(o.Z,{staticStyle:{"margin-top":"24px"},attrs:{cols:"12",md:"12",lg:"12"}},[e("CustomersTable")],1)],1)],1)],1)],1)},c=[],u=s(1676),g=s(6563),m=s(4674),p=s(4069),d=s.t(p,2),f={name:"CustomersComponent",data(){return{title:"Customers",search:""}},methods:{translate(t){let e=null;return p.forEach(((s,r)=>{s.english.toLowerCase()==t.toLowerCase()&&(e=r)})),null===e?t:"german"==this.$store.state.language?d[e].german:d[e].english}},components:{CustomersTable:u.Z,NavbarControl:g.Z,UserControl:m.Z}},h=f,C=s(3736),v=(0,C.Z)(h,i,c,!1,null,"437127bc",null),Z=v.exports,b={name:"CustomersView",components:{Customers:Z}},_=b,x=(0,C.Z)(_,r,a,!1,null,null,null),w=x.exports}}]);
//# sourceMappingURL=customers.fa701e8d.js.map