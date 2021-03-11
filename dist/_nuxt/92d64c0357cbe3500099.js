(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{474:function(e,t,r){var content=r(476);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("8183a152",content,!0,{sourceMap:!1})},475:function(e,t,r){"use strict";var o=r(474);r.n(o).a},476:function(e,t,r){(t=r(18)(!1)).push([e.i,".custom-card-table{padding-bottom:50px}.custom-card-table .title{border-radius:5px}.custom-card-table.purple .title{background:#fff}.custom-card-table.yellow .title{background:#e5e500;color:#000}.custom-card-table.orange .title{background:#ff4500;color:#fff}.custom-card-table.green .title{background:#33b105;color:#fff}.custom-card-table.purple .title{background:#9103b1;color:#fff}.custom-card-table .title{background:#0767c6;padding:15px;color:#fff;font-weight:700}.custom-card-table .actions{text-align:right;padding:10px 15px}.custom-card-table .content{padding:15px}.custom-paginator{padding:25px}",""]),e.exports=t},477:function(e,t,r){"use strict";var o={name:"TableGeneral",props:["title","color"]},c=(r(475),r(10)),component=Object(c.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{class:" custom-card-table "+this.color},[t("div",{staticClass:"title"},[this._v(this._s(this.title))]),this._v(" "),this._t("default")],2)}),[],!1,null,null,null);t.a=component.exports},494:function(e,t,r){var content=r(524);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("1e8b327c",content,!0,{sourceMap:!1})},523:function(e,t,r){"use strict";var o=r(494);r.n(o).a},524:function(e,t,r){(t=r(18)(!1)).push([e.i,".el-select{width:100%}.custom-buttons{padding:15px;text-align:right}",""]),e.exports=t},551:function(e,t,r){"use strict";r.r(t);r(20);var o=r(3),c={layout:"dashboard",middleware:["auth"],transition:{name:"default",mode:"out-in"},components:{TableGeneral:r(477).a},head:function(){return{title:"Edición de productos"}},fetch:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getProduct();case 2:case"end":return t.stop()}}),t)})))()},methods:{getProduct:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("//api.diken.mx/api/products/"+e.$route.params.id);case 2:r=t.sent,e.form=r.data.product;case 4:case"end":return t.stop()}}),t)})))()},resetForm:function(e){this.$refs[e].resetFields()},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.$axios.put("//api.diken.mx/api/products/"+t.$route.params.id,t.form).then((function(e){t.$notify({title:"Correcto",message:"El producto fue actualizado correctamente",type:"success"}),t.$router.push("/products")})).catch((function(e){t.$notify.error({title:"Error",message:"El producto no pudo ser actualizado correctamente"})}))}))}},data:function(){return{products:[],categories:[],form:{code:"",name:"",specifications_desing:"",specifications_operation:"",benefits:"",category_id:1},rules:{specifications_desing:[{required:!0,message:"Agrega especificaciones de diseño",trigger:"blur"}],specifications_operation:[{required:!0,message:"Agrega especificaciones de operación",trigger:"blur"}],description:[{required:!0,message:"Agrega descripción",trigger:"blur"}],benefits:[{required:!0,message:"Agrega beneficios",trigger:"blur"}],code:[{required:!0,message:"Agrega codigo",trigger:"blur"}],name:[{required:!0,message:"Agrega un nombre",trigger:"blur"}]}}}},n=(r(523),r(10)),component=Object(n.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("TableGeneral",{attrs:{title:"Productos",color:"purple"}},[r("el-row",[r("el-col",{staticStyle:{padding:"15px"},attrs:{md:24}},[r("el-card",[r("el-row",[r("el-col",{attrs:{md:24}},[r("h3",[e._v("Actualización de producto")]),e._v(" "),r("br"),e._v(" "),r("hr")]),e._v(" "),r("el-col",{attrs:{md:24}},[r("div",{staticClass:"content-space"},[r("p",[e._v("Información")])])]),e._v(" "),r("el-form",{ref:"formService",staticClass:"form-style-curds",attrs:{rules:e.rules,model:e.form}},[r("el-row",[r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Nombre del producto",prop:"name"}},[r("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Código",prop:"code"}},[r("el-input",{model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{md:24}},[r("el-form-item",{attrs:{label:"Descripción",prop:"description"}},[r("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:24}},[r("el-form-item",{attrs:{label:"Especificaciones de diseño",prop:"specifications_desing"}},[r("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.form.specifications_desing,callback:function(t){e.$set(e.form,"specifications_desing",t)},expression:"form.specifications_desing"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:24}},[r("el-form-item",{attrs:{label:"Especificaciones de operación",prop:"specifications_operation"}},[r("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.form.specifications_operation,callback:function(t){e.$set(e.form,"specifications_operation",t)},expression:"form.specifications_operation"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:24}},[r("el-form-item",{attrs:{label:"Beneficios",prop:"benefits"}},[r("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.form.benefits,callback:function(t){e.$set(e.form,"benefits",t)},expression:"form.benefits"}})],1)],1)],1),e._v(" "),r("el-col",{staticClass:"custom-buttons",attrs:{md:24}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return t.stopPropagation(),e.submitForm("formService")}}},[e._v("Actualizar Producto")])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);