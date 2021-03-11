(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{478:function(t,e,o){var content=o(480);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(19).default)("5e148abe",content,!0,{sourceMap:!1})},479:function(t,e,o){"use strict";var r=o(478);o.n(r).a},480:function(t,e,o){(e=o(18)(!1)).push([t.i,".TitleSection{color:#409eff;padding:25px 15px;text-transform:uppercase}",""]),t.exports=e},481:function(t,e,o){"use strict";var r={props:["title"]},n=(o(479),o(10)),component=Object(n.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"TitleSection"},[e("h2",[this._v(this._s(this.title))])])}),[],!1,null,null,null);e.a=component.exports},493:function(t,e,o){var content=o(522);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(19).default)("9c4374f4",content,!0,{sourceMap:!1})},521:function(t,e,o){"use strict";var r=o(493);o.n(r).a},522:function(t,e,o){(e=o(18)(!1)).push([t.i,".product-card{cursor:pointer;padding:15px;border:1px solid #2d9c03;border-radius:10px;text-align:center}.product-card.cancel{border:1px solid #3c5fe0}.product-card.cancel .product_name{color:#3c5fe0}.product-card.danger{border:1px solid #d90e0e}.product-card.danger .product_name{color:#d90e0e}.product-card .date{font-size:12px}.product-card .date p{font-weight:700}.product-card .serial_number{font-size:10px}.product-card .product_name{color:#2d9c03;font-weight:700;padding:0}.mini-form-product label{display:block;width:100%;text-align:left}.mini-form-product .el-select{width:100%}.table-products{padding:25px 15px}.table-products .body-products,.table-products .body-products .row-custom,.table-products p{padding-top:15px}.table-products .body-products .row-custom.row-header{font-weight:700}",""]),t.exports=e},540:function(t,e,o){"use strict";o.r(e);var r=o(481),n=(o(20),o(3)),c=(o(0),{name:"TableProducts",props:["data","color"],data:function(){return{loadingProduct:!1,windowWidth:0,openAddProduct:!1,products:[],form:{product_type:"",product_id:"",status:!0}}},mounted:function(){var t=this;this.windowWidth=window.innerWidth,window.addEventListener("resize",(function(){t.windowWidth=window.innerWidth}))},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getProducts();case 2:case"end":return e.stop()}}),e)})))()},methods:{getProducts:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("//api.diken.mx/api/products");case 2:o=e.sent,t.products=o.data.rows;case 4:case"end":return e.stop()}}),e)})))()},redirectRelation:function(t){this.$router.push("/clients/"+this.$route.params.client_id+"/product-relation/"+t)},checkDate:function(t){var e=new Date(t).getTime();return Date.now()-e>=0?"danger":""},submitForm:function(t){var e=this;this.loadingProduct=!0,this.$refs[t].validate((function(t){if(!t)return!1;e.$axios.post("//api.diken.mx/api/clients/"+e.$route.params.client_id+"/product-relation",e.form).then((function(t){e.$notify({title:"Correcto",message:"El producto fue asignado correctamente",type:"success"}),e.$emit("updateProductsList"),e.openAddProduct=!1,e.loadingProduct=!1})).catch((function(t){e.loadingProduct=!1}))}))}}}),l=(o(521),o(10)),d=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"table-products"},[o("el-row",[o("el-col",{attrs:{md:24}},[o("h3",[t._v("Administrar los equipos del cliente")]),t._v(" "),o("br"),t._v(" "),o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.openAddProduct=!0}}},[t._v("Agregar equipo a cliente")]),t._v(" "),t.data.length>=1?o("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){return t.$router.push("/services/create")}}},[t._v("Realizar mantenimiento")]):t._e()],1),t._v(" "),o("el-col",{attrs:{md:24}},[o("p",{staticStyle:{padding:"25px 0"}},[o("strong",[t._v("Número de serie:")]),t._v(" El número de serie es asignado al momento de agregar un producto del catálogo al cliente.")])])],1),t._v(" "),o("div",{staticClass:"body-products"},[o("el-row",{attrs:{gutter:15}},t._l(t.data,(function(e){return o("el-col",{staticStyle:{"padding-top":"15px"},attrs:{xs:12,md:8}},[o("div",{staticClass:"product-card",class:t.checkDate(e.next_service),on:{click:function(o){return t.redirectRelation(e.id)}}},[o("el-row",[o("el-col",{attrs:{md:24}},[o("p",{staticClass:"product_name"},[t._v(t._s(e.product.name))]),t._v(" "),o("p",{staticClass:"serial_number"},[t._v(t._s(e.serial_number))])])],1),t._v(" "),o("el-row",{staticClass:"date"},[o("el-col",{attrs:{md:24}},[o("p",[t._v("Última fecha de servicio")]),t._v(" "),o("span",[t._v(t._s(t.$convertDate(e.last_service)))])]),t._v(" "),o("el-col",{attrs:{md:24}},[o("p",[t._v("Proxima fecha de servicio")]),t._v(" "),o("span",[t._v(t._s(t.$convertDate(e.next_service)))])])],1),t._v(" "),o("el-row",[o("el-col",{attrs:{md:12,offset:12}})],1)],1)])})),1)],1),t._v(" "),o("el-dialog",{attrs:{title:"Asignar equipo a cliente",visible:t.openAddProduct,width:t.$getWidthModal(t.windowWidth)},on:{"update:visible":function(e){t.openAddProduct=e}}},[o("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingProduct,expression:"loadingProduct"}]},[o("el-form",{ref:"formProduct",staticClass:"mini-form-product",attrs:{model:t.form}},[o("el-col",{attrs:{md:24}},[o("el-form-item",{attrs:{label:"Tipo de Equipo"}},[o("el-select",{attrs:{placeholder:"Selecciona el tipo de equipo"},model:{value:t.form.product_type,callback:function(e){t.$set(t.form,"product_type",e)},expression:"form.product_type"}},[o("el-option",{attrs:{label:"Propio",value:"own"}}),t._v(" "),o("el-option",{attrs:{label:"Comodato",value:"borrowed"}})],1)],1)],1),t._v(" "),o("el-col",{attrs:{md:24}},[o("el-form-item",{attrs:{label:"Selecciona Equipo",prop:"product_id"}},[o("el-select",{attrs:{placeholder:"Selecciona un equipo"},model:{value:t.form.product_id,callback:function(e){t.$set(t.form,"product_id",e)},expression:"form.product_id"}},t._l(t.products,(function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),t._v(" "),o("el-col",{attrs:{md:24}},[o("div",{staticClass:"content-space",staticStyle:{"text-align":"right"}},[o("el-button",{attrs:{type:"info"},on:{click:function(e){t.openAddProduct=!1}}},[t._v("Cancelar")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){return e.stopPropagation(),t.submitForm("formProduct")}}},[t._v("Asignar producto")])],1)])],1)],1)],1)],1)}),[],!1,null,null,null).exports,m={layout:"dashboard",middleware:["auth"],transition:{name:"default",mode:"out-in"},components:{TitleSection:r.a,TableProducts:d},head:function(){return{title:"Actualización de cliente"}},data:function(){return{form:{role:"client",password:"",business_name:"",rfc:"",company_name:"",contacts:[]},rules:{name:[{required:!0,message:"Agrega nombre",trigger:"blur"}],last_name:[{required:!0,message:"Agrega apellido",trigger:"blur"}],email:[{required:!0,message:"Agrega un correo",trigger:"blur"}],company_name:[{required:!0,message:"Agrega el nombre de la empresa",trigger:"blur"}]},products:[]}},methods:{addContact:function(){this.form.contacts.push({name:"",phone:"",job:""})},DeleteContact:function(t){this.form.contacts.splice(t,1)},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.$axios.patch("//api.diken.mx/api/clients/"+e.$route.params.client_id,e.form).then((function(t){e.$notify({title:"Notificación",message:"El cliente fue actualizado correctamente",type:"success"})})).catch((function(t){e.$notify.error({title:"Error",message:"El cliente no ha posido ser actualizado"})}))}))},getUser:function(){var t=this;this.$axios.get("//api.diken.mx/api/clients/"+this.$route.params.client_id).then((function(e){t.form=e.data.data.user})).catch((function(t){console.log("error")}))},getProducts:function(){var t=this;this.$axios.get("//api.diken.mx/api/clients/"+this.$route.params.client_id+"/product-relation").then((function(e){t.products=e.data.data.rows})).catch((function(t){console.log("error",t)}))}},mounted:function(){this.getUser(),this.getProducts()}},f=Object(l.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[o("el-breadcrumb-item",{attrs:{to:{path:"/clients"}}},[t._v("Clientes")]),t._v(" "),o("el-breadcrumb-item",[t._v("Detalle de cliente")])],1),t._v(" "),o("el-row",{staticClass:"group-title"},[o("el-col",{attrs:{md:12}},[o("TitleSection",{attrs:{title:"Cliente"}})],1)],1),t._v(" "),o("el-row",[o("el-form",{ref:"formUser",staticClass:"form-style-curds",attrs:{rules:t.rules,model:t.form}},[o("el-row",[o("el-col",{attrs:{md:24}},[o("div",{staticClass:"content-space"},[o("p",[t._v("Información de la empresa")])])])],1),t._v(" "),o("el-row",[o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Razón social",prop:"business_name"}},[o("el-input",{model:{value:t.form.business_name,callback:function(e){t.$set(t.form,"business_name",e)},expression:"form.business_name"}})],1)],1),t._v(" "),o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"RFC",prop:"rfc"}},[o("el-input",{model:{value:t.form.rfc,callback:function(e){t.$set(t.form,"rfc",e)},expression:"form.rfc"}})],1)],1),t._v(" "),o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Nombre de la empresa",prop:"company_name"}},[o("el-input",{model:{value:t.form.company_name,callback:function(e){t.$set(t.form,"company_name",e)},expression:"form.company_name"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{md:24}},[o("div",{staticClass:"content-space"},[o("p",[t._v("Datos de acceso a la plataforma")])])])],1),t._v(" "),o("el-row",[o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Nombre completo",prop:"name"}},[o("el-input",{attrs:{required:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)],1),t._v(" "),o("el-col",{attrs:{xs:12,md:6}},[o("el-form-item",{attrs:{label:"Apellido Paterno",prop:"last_name"}},[o("el-input",{model:{value:t.form.last_name,callback:function(e){t.$set(t.form,"last_name",e)},expression:"form.last_name"}})],1)],1),t._v(" "),o("el-col",{attrs:{xs:12,md:6}},[o("el-form-item",{attrs:{label:"Apellido Materno",prop:"second_last_name"}},[o("el-input",{model:{value:t.form.second_last_name,callback:function(e){t.$set(t.form,"second_last_name",e)},expression:"form.second_last_name"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Correo electrónico",prop:"email"}},[o("el-input",{model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1)],1),t._v(" "),o("el-col",{attrs:{md:6}},[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Agrega una contraseña, solo si deseas hacer el cambio.",placement:"top-start"}},[o("el-form-item",{attrs:{label:"Nueva Contraseña",prop:"password"}},[o("el-input",{attrs:{type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1)],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{md:12}},[o("div",{staticClass:"content-space"},[o("p",[t._v("Datos de contacto")])])]),t._v(" "),o("el-col",{attrs:{md:12}},[o("div",{staticClass:"content-space"},[o("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:t.addContact}},[t._v("Agregar nuevo contacto")])],1)])],1),t._v(" "),t._l(t.form.contacts,(function(e,r){return o("el-row",[o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Nombre de contacto"}},[o("el-input",{model:{value:e.name,callback:function(o){t.$set(e,"name",o)},expression:"contact.name"}})],1)],1),t._v(" "),o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Teléfono de contacto"}},[o("el-input",{model:{value:e.phone,callback:function(o){t.$set(e,"phone",o)},expression:"contact.phone"}})],1)],1),t._v(" "),o("el-col",{attrs:{md:6}},[o("el-form-item",{attrs:{label:"Puesto"}},[o("el-input",{model:{value:e.job,callback:function(o){t.$set(e,"job",o)},expression:"contact.job"}})],1)],1),t._v(" "),o("el-col",{attrs:{md:6}},[o("div",{staticStyle:{"padding-top":"35px"}},[o("el-button",{attrs:{type:"danger",plain:""},on:{click:function(e){return t.DeleteContact(r)}}},[t._v("Eliminar contacto")])],1)])],1)})),t._v(" "),t.$currentRole(["admin"])?o("el-col",{attrs:{md:24}},[o("div",{staticClass:"content-space"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("formUser")}}},[t._v("Actualizar datos de cliente")])],1)]):t._e(),t._v(" "),o("el-col",{attrs:{md:24}},[o("TableProducts",{attrs:{data:t.products},on:{updateProductsList:function(e){return t.getProducts()}}})],1)],2)],1)],1)}),[],!1,null,null,null);e.default=f.exports}}]);