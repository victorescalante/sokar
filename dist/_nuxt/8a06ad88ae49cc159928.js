(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{474:function(e,t,r){var content=r(479);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("5e148abe",content,!0,{sourceMap:!1})},478:function(e,t,r){"use strict";var o=r(474);r.n(o).a},479:function(e,t,r){(t=r(18)(!1)).push([e.i,".TitleSection{color:#409eff;padding:25px 15px;text-transform:uppercase}",""]),e.exports=t},480:function(e,t,r){"use strict";var o={props:["title"]},l=(r(478),r(10)),component=Object(l.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"TitleSection"},[t("h2",[this._v(this._s(this.title))])])}),[],!1,null,null,null);t.a=component.exports},539:function(e,t,r){"use strict";r.r(t);var o={layout:"dashboard",middleware:["auth"],transition:{name:"default",mode:"out-in"},components:{TitleSection:r(480).a},head:function(){return{title:"Actualización de usuario"}},data:function(){return{form:{name:"",last_name:"",second_last_name:"",email:"",password:"",role:"cliente"},rules:{name:[{required:!0,message:"Agrega nombre",trigger:"blur"}],last_name:[{required:!0,message:"Agrega apellido",trigger:"blur"}],email:[{required:!0,message:"Agrega un correo",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.form.password.length<=1&&delete t.form.password,t.$axios.put("//api.diken.mx/api/users/"+t.$route.params.id,t.form).then((function(e){t.$notify({title:"Correcto",message:"El usuario fue actualizado correctamente",type:"success"})})).catch((function(e){t.$notify.error({title:"Error",message:"El usuario no ha posido ser actualizado"})}))}))},getUser:function(){var e=this;this.$axios.get("//api.diken.mx/api/users/"+this.$route.params.id).then((function(t){e.form=t.data.data.user})).catch((function(e){console.log("error")}))}},mounted:function(){this.getUser()}},l=r(10),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/users"}}},[e._v("Usuarios")]),e._v(" "),r("el-breadcrumb-item",[e._v("Actualizar de usuario")])],1),e._v(" "),r("el-row",{staticClass:"group-title"},[r("el-col",{attrs:{md:12}},[r("TitleSection",{attrs:{title:"Actualizar Cliente"}})],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{md:24}},[r("div",{staticClass:"content-space"},[r("p",[e._v("Información personal del usuario")])])]),e._v(" "),r("el-form",{ref:"formUser",staticClass:"form-style-curds",attrs:{rules:e.rules,model:e.form}},[r("el-col",{attrs:{md:6}},[r("el-form-item",{attrs:{label:"Nombre completo",prop:"name"}},[r("el-input",{attrs:{required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-form-item",{attrs:{label:"Apellido Paterno",prop:"last_name"}},[r("el-input",{model:{value:e.form.last_name,callback:function(t){e.$set(e.form,"last_name",t)},expression:"form.last_name"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-form-item",{attrs:{label:"Apellido Materno",prop:"second_last_name"}},[r("el-input",{model:{value:e.form.second_last_name,callback:function(t){e.$set(e.form,"second_last_name",t)},expression:"form.second_last_name"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:24}},[r("div",{staticClass:"content-space"},[r("p",[e._v("Datos de acceso a la plataforma")])])]),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-form-item",{attrs:{label:"Correo electrónico",prop:"email"}},[r("el-input",{model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-form-item",{attrs:{label:"Nueva Contraseña",prop:"password"}},[r("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:24}},[r("div",{staticClass:"content-space"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("formUser")}}},[e._v("Actualizar usuario")])],1)])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);