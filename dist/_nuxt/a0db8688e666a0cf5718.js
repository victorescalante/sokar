(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{474:function(e,t,r){var content=r(476);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("8183a152",content,!0,{sourceMap:!1})},475:function(e,t,r){"use strict";var o=r(474);r.n(o).a},476:function(e,t,r){(t=r(18)(!1)).push([e.i,".custom-card-table{padding-bottom:50px}.custom-card-table .title{border-radius:5px}.custom-card-table.purple .title{background:#fff}.custom-card-table.yellow .title{background:#e5e500;color:#000}.custom-card-table.orange .title{background:#ff4500;color:#fff}.custom-card-table.green .title{background:#33b105;color:#fff}.custom-card-table.purple .title{background:#9103b1;color:#fff}.custom-card-table .title{background:#0767c6;padding:15px;color:#fff;font-weight:700}.custom-card-table .actions{text-align:right;padding:10px 15px}.custom-card-table .content{padding:15px}.custom-paginator{padding:25px}",""]),e.exports=t},477:function(e,t,r){"use strict";var o={name:"TableGeneral",props:["title","color"]},c=(r(475),r(10)),component=Object(c.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{class:" custom-card-table "+this.color},[t("div",{staticClass:"title"},[this._v(this._s(this.title))]),this._v(" "),this._t("default")],2)}),[],!1,null,null,null);t.a=component.exports},478:function(e,t,r){var content=r(480);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("5e148abe",content,!0,{sourceMap:!1})},479:function(e,t,r){"use strict";var o=r(478);r.n(o).a},480:function(e,t,r){(t=r(18)(!1)).push([e.i,".TitleSection{color:#409eff;padding:25px 15px;text-transform:uppercase}",""]),e.exports=t},481:function(e,t,r){"use strict";var o={props:["title"]},c=(r(479),r(10)),component=Object(c.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"TitleSection"},[t("h2",[this._v(this._s(this.title))])])}),[],!1,null,null,null);t.a=component.exports},497:function(e,t,r){var content=r(531);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("1adc5086",content,!0,{sourceMap:!1})},530:function(e,t,r){"use strict";var o=r(497);r.n(o).a},531:function(e,t,r){(t=r(18)(!1)).push([e.i,".el-select{width:100%}.custom-buttons{padding:15px}.table-service .container-costs{padding-top:15px;color:#5d3ce7}.table-service .container-costs .header{padding:10px 0}.table-service .detail-service{padding:10px}.table-service .el-card{margin-top:15px}.table-service .container-card{padding:15px 0}.table-service .container-card .box-card{margin-top:15px}",""]),e.exports=t},555:function(e,t,r){"use strict";r.r(t);r(20);var o=r(3),c=r(481),l=r(477),n=r(482),d=r.n(n),m=r(0),v=r.n(m),_={layout:"dashboard",middleware:["auth"],transition:{name:"default",mode:"out-in"},components:{TitleSection:c.a,TableGeneral:l.a},head:function(){return{title:"Actualización de servicio"}},data:function(){return{upload:{url:"//api.diken.mx/api/files",headers:{Authorization:this.$auth.getToken("local")},data:{category:"default",model_id:"",model:0},list:[]},dialogImageUrl:"",clients:[],techs:[],products:[],reports:[],comments:[],clientHaveProducts:!1,form:{product_user_ids:[],client_id:"",technical_id:"",tentative_date:"",type:"",kms:"",activity:""},rules:{}}},methods:{UpdateService:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.form.tentative_date=v()(e.form.tentative_date).locale("es-mx").format("Y-M-D H:mm"),t.next=3,e.$axios.$patch("//api.diken.mx/api/services/"+e.$route.params.service_id,e.form);case 3:e.$notify({title:"Servicio actualizado",message:"Servicio actualizado correctamente.",type:"success"});case 4:case"end":return t.stop()}}),t)})))()},init:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("//api.diken.mx/api/clients?limit=200");case 2:return r=t.sent,t.next=5,e.$axios.$get("//api.diken.mx/api/users?limit=200&role=tecnico");case 5:o=t.sent,e.clients=r.data.rows,e.techs=o.data.rows;case 8:case"end":return t.stop()}}),t)})))()},getService:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("//api.diken.mx/api/services/"+e.$route.params.service_id);case 2:return r=t.sent,t.next=5,e.$axios.$get("//api.diken.mx/api/clients/"+r.data.service.client_id+"/product-relation?limit=200");case 5:o=t.sent,e.products=o.data.rows,e.reports=r.data.service.reports,e.comments=r.data.service.comments,e.form.client_id=r.data.service.client_id,e.form.technical_id=r.data.service.technical_id,e.form.tentative_date=r.data.service.tentative_date,e.form.type=r.data.service.type,e.form.kms=r.data.service.kms,e.form.activity=r.data.service.activity,e.form.product_user_ids=d.a.map(r.data.service.reports,(function(e){return e.product_user.product.id}));case 16:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.init(),this.getService()}},f=(r(530),r(10)),component=Object(f.a)(_,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table-service"},[r("TableGeneral",{attrs:{title:"Mantenimiento",color:"purple"}},[r("el-row",[r("el-col",{attrs:{md:24}},[r("el-card",[r("el-row",[r("el-col",{staticStyle:{"padding-left":"10px"},attrs:{md:24}},[r("h3",[e._v("Visita de mantenimiento")])]),e._v(" "),r("el-col",{staticStyle:{"padding-top":"15px"},attrs:{md:24}},[r("el-form",{ref:"formService",staticClass:"form-style-curds",attrs:{rules:e.rules,model:e.form}},[r("el-row",[r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Nombre del Técnico",prop:"technical_id"}},[r("el-select",{attrs:{placeholder:"Selecciona un técnico",disabled:""},model:{value:e.form.technical_id,callback:function(t){e.$set(e.form,"technical_id",t)},expression:"form.technical_id"}},e._l(e.techs,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Nombre del Cliente / Empresa",prop:"client_id"}},[r("el-select",{attrs:{filterable:"",placeholder:"Selecciona un cliente",disabled:""},model:{value:e.form.client_id,callback:function(t){e.$set(e.form,"client_id",t)},expression:"form.client_id"}},e._l(e.clients,(function(e){return r("el-option",{key:e.id,attrs:{label:e.company_name,value:e.id}})})),1)],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Fecha tentativa de atención",prop:"tentative_date"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"Selecciona una fecha y hora"},on:{change:e.UpdateService},model:{value:e.form.tentative_date,callback:function(t){e.$set(e.form,"tentative_date",t)},expression:"form.tentative_date"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Tipo de mantenimiento"}},[r("el-select",{attrs:{placeholder:"Selecciona el tipo de mantenimiento"},model:{value:e.form.activity,callback:function(t){e.$set(e.form,"activity",t)},expression:"form.activity"}},[r("el-option",{attrs:{label:"Mantenimiento correctivo",value:"corrective"}}),e._v(" "),r("el-option",{attrs:{label:"Mantenimiento preventivo",value:"preventive"}})],1)],1)],1),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Tipo de servicio"}},[r("el-select",{attrs:{placeholder:"Selecciona el tipo de servicio"},on:{change:function(t){e.form.kms=0,e.UpdateService()}},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[r("el-option",{attrs:{label:"Remoto",value:"remote"}}),e._v(" "),r("el-option",{attrs:{label:"Presencial",value:"face-to-face"}})],1)],1)],1),e._v(" "),"face-to-face"===e.form.type?r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Distancia en kilometros"}},[r("el-input-number",{attrs:{min:0,max:1e3},on:{change:e.UpdateService},model:{value:e.form.kms,callback:function(t){e.$set(e.form,"kms",t)},expression:"form.kms"}})],1)],1):e._e()],1),e._v(" "),r("el-row",[r("el-col",{attrs:{md:18}},[r("div",{staticStyle:{padding:"15px"}},[r("p",[r("strong",[e._v("Comentarios del cliente")])]),e._v(" "),e.comments.length<=0?r("div",{staticStyle:{padding:"15px"}},[r("el-alert",{attrs:{title:"El cliente aún no realiza comentarios sobre el mantenimiento",type:"info",center:"","show-icon":""}})],1):r("div",{staticStyle:{padding:"15px 0"}},[r("el-timeline",e._l(e.comments,(function(t){return r("el-timeline-item",{attrs:{timestamp:e.$convertDateToHuman(t.created_at),color:"#0b7c79",placement:"top"}},[t.check_revision?r("div",[r("el-alert",{attrs:{title:"El cliente solicito una revisión de este mantenimeinto",type:"error",center:"","show-icon":""}})],1):e._e(),e._v(" "),r("el-card",[r("h4",[e._v("Comentario de cliente")]),e._v(" "),r("p",[e._v(e._s(t.description))])])],1)})),1)],1)])])],1)],1)],1)],1)],1)],1)],1)],1),e._v(" "),e._l(e.reports,(function(t,o){return r("TableGeneral",{attrs:{title:"Ordenen de servicio #"+(o+1),color:"blue"}},[r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{md:18}},[r("el-card",[r("p",[r("b",[e._v(e._s(t.product_user.product.name))]),e._v(" - "+e._s(t.product_user.serial_number))])])],1),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-card",[r("div",[r("p",[r("b",[e._v("Estatus")]),e._v(" - "),r("span",{staticStyle:{"text-transform":"capitalize"}},[e._v(e._s(t.status))])])])])],1),e._v(" "),r("el-col",{attrs:{md:24}},[r("el-card",[r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{md:24}},[r("b",{staticStyle:{color:"dodgerblue"}},[e._v("Detalle de la orden de servicio.")])]),e._v(" "),r("el-col",{attrs:{md:12}},[r("div",{staticStyle:{padding:"20px 0px"}},[r("b",[e._v("Descripción:")]),e._v(" "),t.description?r("p",[e._v(e._s(t.description))]):r("p",[e._v("Aún no hay descripción")])]),e._v(" "),r("b",[e._v("Costos asociados a la orden de servicio")]),e._v(" "),t.costs.length>=1?r("div",{staticClass:"container-costs"},[r("el-row",{staticClass:"header",attrs:{gutter:15}},[r("el-col",{attrs:{md:16}},[e._v("Descripción")]),e._v(" "),r("el-col",{attrs:{md:8}},[e._v("Costo")])],1),e._v(" "),r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{md:16}}),e._v(" "),r("el-col",{attrs:{md:8}})],1)],1):r("p",[e._v("Aún no hay costos asociados")])]),e._v(" "),r("el-col",{attrs:{md:12}},[r("div",{staticClass:"detail-service"},[r("el-row",[r("el-col",{attrs:{md:24}},[r("div",{staticStyle:{padding:"20px 0px"}},[r("b",[e._v("Forma de uso encontrada")]),e._v(" "),r("p",[e._v("Dilución - "+e._s(t.dilution))]),e._v(" "),r("p",[e._v("Frecuencía - "+e._s(t.frequency))]),e._v(" "),r("p",[e._v("Método - "+e._s(t.method))])]),e._v(" "),r("div",{staticStyle:{"text-align":"right"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.$router.push("/services/"+e.$route.params.service_id+"/reports/"+t.id)}}},[e._v("Actualizar orden de servicio")])],1)])],1)],1)])],1)],1)],1)],1)],1)})),e._v(" "),r("el-row",[r("el-col",{attrs:{md:24}},[r("el-row",[e.products.length>=1?r("el-col",{attrs:{md:24}},[r("div",{staticStyle:{padding:"15px"}},[r("p",[r("strong",[e._v("Estos son los equipos seleccionados para el mantenimiento")])]),e._v(" "),r("el-row",{staticClass:"container-card",attrs:{gutter:15}},e._l(e.products,(function(t){return r("el-col",{attrs:{md:8}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[r("b",[e._v(e._s(t.product.name))])])]),e._v(" "),r("p",{staticStyle:{color:"#7F828B","font-size":"14px"}},[e._v("Número de serie")]),e._v(" "),r("small",[e._v(e._s(t.serial_number))]),e._v(" "),r("br"),r("br"),e._v(" "),r("p",{staticStyle:{color:"#7F828B","font-size":"14px"}},[e._v("Última fecha de mantenimiento")]),e._v(" "),r("b",[e._v(e._s(e.$convertDateToHuman(t.last_service)))]),e._v(" "),r("br"),r("br"),e._v(" "),r("p",[e._v("Fecha de mantenimiento proxima")]),e._v(" "),r("b",{staticStyle:{color:"#5d3ce7"}},[e._v(e._s(e.$convertDateToHuman(t.next_service)))]),e._v(" "),r("br"),e._v(" "),r("el-checkbox-group",{staticStyle:{"text-align":"right",padding:"15px"},model:{value:e.form.product_user_ids,callback:function(t){e.$set(e.form,"product_user_ids",t)},expression:"form.product_user_ids"}},[r("el-checkbox",{attrs:{label:t.product.id,disabled:""}},[e._v("Seleccionar")])],1)],1)],1)})),1)],1)]):e._e()],1)],1)],1)],2)}),[],!1,null,null,null);t.default=component.exports}}]);