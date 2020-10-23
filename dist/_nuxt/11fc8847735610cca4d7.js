(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{473:function(e,t,r){var content=r(475);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("8183a152",content,!0,{sourceMap:!1})},474:function(e,t,r){"use strict";var o=r(473);r.n(o).a},475:function(e,t,r){(t=r(18)(!1)).push([e.i,".custom-card-table{padding-bottom:50px}.custom-card-table .title{border-radius:5px}.custom-card-table.purple .title{background:#fff}.custom-card-table.yellow .title{background:#e5e500;color:#000}.custom-card-table.orange .title{background:#ff4500;color:#fff}.custom-card-table.green .title{background:#33b105;color:#fff}.custom-card-table.purple .title{background:#9103b1;color:#fff}.custom-card-table .title{background:#0767c6;padding:15px;color:#fff;font-weight:700}.custom-card-table .actions{text-align:right;padding:10px 15px}.custom-card-table .content{padding:15px}.custom-paginator{padding:25px}",""]),e.exports=t},476:function(e,t,r){"use strict";var o={name:"TableGeneral",props:["title","color"]},n=(r(474),r(10)),component=Object(n.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{class:" custom-card-table "+this.color},[t("div",{staticClass:"title"},[this._v(this._s(this.title))]),this._v(" "),this._t("default")],2)}),[],!1,null,null,null);t.a=component.exports},491:function(e,t,r){var content=r(518);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("6a93c9f0",content,!0,{sourceMap:!1})},517:function(e,t,r){"use strict";var o=r(491);r.n(o).a},518:function(e,t,r){(t=r(18)(!1)).push([e.i,".el-select{width:100%}.custom-buttons{padding:15px}.table-general .container-card{padding:15px 0}.table-general .container-card .box-card{margin-top:15px}",""]),e.exports=t},544:function(e,t,r){"use strict";r.r(t);r(20);var o=r(3),n=r(476),c=r(0),l=r.n(c),d={layout:"dashboard",middleware:["auth"],transition:{name:"default",mode:"out-in"},components:{TableGeneral:n.a},head:function(){return{title:"Creación de servicio"}},mounted:function(){this.init(),"tecnico"===this.$auth.user.role&&(this.form.technical_id=this.$auth.user.id,this.isTechUser=!0)},methods:{init:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("http://127.0.0.1:8000/api/clients?limit=200");case 2:return r=t.sent,t.next=5,e.$axios.$get("http://127.0.0.1:8000/api/users?limit=200&role=tecnico");case 5:o=t.sent,e.clients=r.data.rows,e.techs=o.data.rows;case 8:case"end":return t.stop()}}),t)})))()},getProductsOfClients:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.form.product_user_ids=[],r.next=3,t.$axios.$get("http://127.0.0.1:8000/api/clients/"+e+"/product-relation?limit=200");case 3:o=r.sent,t.products=o.data.rows,t.products.length<=0&&t.$confirm("<p>Este cliente aún no tiene equipos asignados, <b>¿Quieres asignar un equipo al cliente?</b></p>","Imposible ofrecer mantenimiento",{dangerouslyUseHTMLString:!0,confirmButtonText:"SI",cancelButtonText:"NO",type:"error"}).then((function(){t.$router.push("/clients/"+e)})).catch((function(){t.$message({type:"info",message:"Ha sido cancelada la operación"})}));case 6:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.form.tentative_date=l()(t.form.tentative_date).locale("es-mx").format("Y-M-D H:mm"),t.$axios.post("http://127.0.0.1:8000/api/services",t.form).then((function(e){t.$notify({title:"Correcto",message:"El servicio fue creado correctamente",type:"success"}),t.$router.push("/services/"+e.data.data.id)})).catch((function(e){t.$notify.error({title:"Error",message:"El servicio no ha posido ser creado"})}))}))}},data:function(){return{isTechUser:!1,clients:[],techs:[],products:[],clientHaveProducts:!1,form:{product_user_ids:[],client_id:"",technical_id:"",tentative_date:"",type:"face-to-face",kms:0,activity:"corrective"},rules:{tentative_date:[{required:!0,message:"La fecha tentativa es obligatorio",trigger:"blur"}],technical_id:[{required:!0,message:"Asignar un tecnico es obligatorio",trigger:"blur"}]}}}},m=(r(517),r(10)),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table-general"},[r("TableGeneral",{attrs:{title:"Mantenimiento",color:"purple"}},[r("el-row",[r("el-col",{attrs:{md:24}},[r("el-card",[r("el-row",[r("el-col",{staticStyle:{"padding-left":"10px"},attrs:{md:24}},[r("h3",[e._v("Visita de mantenimiento")])]),e._v(" "),r("el-col",{staticStyle:{"padding-top":"15px"},attrs:{md:24}},[r("el-form",{ref:"formService",staticClass:"form-style-curds",attrs:{rules:e.rules,model:e.form}},[r("el-row",[r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Nombre del Técnico",prop:"technical_id"}},[r("el-select",{attrs:{filterable:"",placeholder:"Selecciona un técnico",disabled:e.isTechUser},model:{value:e.form.technical_id,callback:function(t){e.$set(e.form,"technical_id",t)},expression:"form.technical_id"}},e._l(e.techs,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Nombre del Cliente / Empresa",prop:"client_id"}},[r("el-select",{attrs:{filterable:"",placeholder:"Selecciona un cliente"},on:{change:e.getProductsOfClients},model:{value:e.form.client_id,callback:function(t){e.$set(e.form,"client_id",t)},expression:"form.client_id"}},e._l(e.clients,(function(e){return r("el-option",{key:e.id,attrs:{label:e.company_name,value:e.id}})})),1)],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Fecha tentativa de atención",prop:"tentative_date"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"Selecciona una fecha y hora"},model:{value:e.form.tentative_date,callback:function(t){e.$set(e.form,"tentative_date",t)},expression:"form.tentative_date"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Tipo de mantenimiento"}},[r("el-select",{attrs:{placeholder:"Selecciona el tipo de mantenimiento"},model:{value:e.form.activity,callback:function(t){e.$set(e.form,"activity",t)},expression:"form.activity"}},[r("el-option",{attrs:{label:"Mantenimiento correctivo",value:"corrective"}}),e._v(" "),r("el-option",{attrs:{label:"Mantenimiento preventivo",value:"preventive"}})],1)],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Tipo de servicio"}},[r("el-select",{attrs:{placeholder:"Selecciona el tipo de servicio"},on:{change:function(t){e.form.kms=0}},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[r("el-option",{attrs:{label:"Remoto",value:"remote"}}),e._v(" "),r("el-option",{attrs:{label:"Presencial",value:"face-to-face"}})],1)],1)],1),e._v(" "),"face-to-face"===e.form.type?r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Distancia en kilometros"}},[r("el-input-number",{attrs:{min:0,max:1e3},model:{value:e.form.kms,callback:function(t){e.$set(e.form,"kms",t)},expression:"form.kms"}})],1)],1):e._e()],1),e._v(" "),r("el-row",[e.products.length>=1?r("el-col",{attrs:{md:24}},[r("div",{staticStyle:{padding:"15px"}},[r("p",[r("strong",[e._v("Selecciona los equipos a los cuales deseas realizar mantenimiento")])]),e._v(" "),r("el-row",{staticClass:"container-card",attrs:{gutter:15}},e._l(e.products,(function(t){return r("el-col",{attrs:{md:8}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[r("b",[e._v(e._s(t.product.name))])])]),e._v(" "),r("p",{staticStyle:{color:"#7F828B","font-size":"14px"}},[e._v("Número de serie")]),e._v(" "),r("small",[e._v(e._s(t.serial_number))]),e._v(" "),r("br"),r("br"),e._v(" "),r("p",{staticStyle:{color:"#7F828B","font-size":"14px"}},[e._v("Última fecha de mantenimiento")]),e._v(" "),r("b",[e._v(e._s(e.$convertDateToHuman(t.last_service)))]),e._v(" "),r("br"),r("br"),e._v(" "),r("p",[e._v("Fecha de mantenimiento proxima")]),e._v(" "),r("b",{staticStyle:{color:"#5d3ce7"}},[e._v(e._s(e.$convertDateToHuman(t.next_service)))]),e._v(" "),r("br"),e._v(" "),r("el-checkbox-group",{staticStyle:{"text-align":"right",padding:"15px"},model:{value:e.form.product_user_ids,callback:function(t){e.$set(e.form,"product_user_ids",t)},expression:"form.product_user_ids"}},[r("el-checkbox",{attrs:{label:t.id}},[e._v("Seleccionar")])],1)],1)],1)})),1)],1)]):e._e()],1),e._v(" "),r("el-row",[r("el-col",{staticClass:"custom-buttons",attrs:{md:24}},[r("el-button",{attrs:{type:"primary",disabled:e.form.product_user_ids.length<=0},on:{click:function(t){return e.submitForm("formService")}}},[e._v("Crear ordenes de servicio")])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);