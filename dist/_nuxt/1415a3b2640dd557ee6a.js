(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{473:function(t,e,n){var content=n(476);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("8183a152",content,!0,{sourceMap:!1})},475:function(t,e,n){"use strict";var r=n(473);n.n(r).a},476:function(t,e,n){(e=n(18)(!1)).push([t.i,".custom-card-table{padding-bottom:50px}.custom-card-table .title{border-radius:5px}.custom-card-table.purple .title{background:#fff}.custom-card-table.yellow .title{background:#e5e500;color:#000}.custom-card-table.orange .title{background:#ff4500;color:#fff}.custom-card-table.green .title{background:#33b105;color:#fff}.custom-card-table.purple .title{background:#9103b1;color:#fff}.custom-card-table .title{background:#0767c6;padding:15px;color:#fff;font-weight:700}.custom-card-table .actions{text-align:right;padding:10px 15px}.custom-card-table .content{padding:15px}.custom-paginator{padding:25px}",""]),t.exports=e},477:function(t,e,n){"use strict";var r={name:"TableGeneral",props:["title","color"]},o=(n(475),n(10)),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:" custom-card-table "+this.color},[e("div",{staticClass:"title"},[this._v(this._s(this.title))]),this._v(" "),this._t("default")],2)}),[],!1,null,null,null);e.a=component.exports},485:function(t,e,n){var content=n(504);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("27fb8f88",content,!0,{sourceMap:!1})},503:function(t,e,n){"use strict";var r=n(485);n.n(r).a},504:function(t,e,n){(e=n(18)(!1)).push([t.i,".custom-dialog .el-dialog__header .el-dialog__title{color:#5d3ce7;font-weight:700}.custom-dialog p{padding-top:12px}.custom-dialog b{color:#000}.text-overflow .cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",""]),t.exports=e},532:function(t,e,n){"use strict";n.r(e);n(20);var r=n(3),o={layout:"dashboard",middleware:["auth"],transition:{name:"default",mode:"out-in"},components:{TableGeneral:n(477).a},head:function(){return{title:"Administración de mantenimientos"}},data:function(){return{data:[],viewDetail:!1,viewData:{product:{},category:{}},paginator:{limit:50,page:1},total_data:0}},methods:{handleSizeChange:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.paginator.limit=t,n.next=3,e.$axios.$get("//api.diken.mx/api/products",{params:e.paginator});case 3:data=n.sent,e.data=data.data.rows,e.total_data=data.data.total;case 6:case"end":return n.stop()}}),n)})))()},HandleCurrentPage:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.paginator.page=t,n.next=3,e.$axios.$get("//api.diken.mx/api/products",{params:e.paginator});case 3:data=n.sent,e.data=data.data.rows,e.total_data=data.data.total;case 6:case"end":return n.stop()}}),n)})))()},init:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("//api.diken.mx/api/products");case 2:data=e.sent,t.data=data.data.rows,t.total_data=data.data.total;case 5:case"end":return e.stop()}}),e)})))()},handleEdit:function(t,e){this.$router.push("/repair/"+e.id)},handleView:function(t,e){this.viewData=e,this.viewDetail=!0},defineProgress:function(progress){return progress<=10?"":progress<=50?"exception":progress<100?"warning":"success"}},mounted:function(){this.init()}},c=(n(503),n(10)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("TableGeneral",{attrs:{title:"Administración de Equipos",color:"green"}},[n("div",{staticClass:"actions"},[n("nuxt-link",{attrs:{to:"products/create"}},[n("el-button",{staticClass:"el-button--primary",attrs:{icon:"el-icon-plus",disabled:""}},[t._v("Agregar un equipo")])],1)],1),t._v(" "),n("div",{staticClass:"content"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data,stripe:"","default-sort":{prop:"ascending",order:"asc"}}},[n("el-table-column",{attrs:{prop:"code",sortable:"",width:"150",label:"Código"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",sortable:"",width:"300",label:"Nombre"}}),t._v(" "),n("el-table-column",{attrs:{sortable:"","class-name":"text-overflow",prop:"description",label:"Descripción"}}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"Operaciones"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleView(e.$index,e.row)}}},[t._v("Detalle")]),t._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleEdit(e.$index,e.row)}}},[t._v("Editar")])]}}])})],1),t._v(" "),n("el-pagination",{staticClass:"custom-paginator",attrs:{"page-sizes":[50,100,200],"page-size":50,layout:"sizes, prev, pager, next",total:t.total_data},on:{"size-change":t.handleSizeChange,"current-change":t.HandleCurrentPage}})],1)]),t._v(" "),n("el-dialog",{staticClass:"custom-dialog",attrs:{title:t.viewData.name,visible:t.viewDetail,width:"50%",center:""},on:{"update:visible":function(e){t.viewDetail=e}}},[n("p",[n("b",[t._v("Código: ")]),t._v(t._s(t.viewData.code))]),t._v(" "),n("p",[n("b",[t._v("Nombre del producto: ")]),t._v(t._s(t.viewData.name))]),t._v(" "),n("p",[n("b",[t._v("Descripción: ")]),t._v(t._s(t.viewData.description))]),t._v(" "),n("p",[n("b",[t._v("Especificaciones de diseño: ")]),t._v(t._s(t.viewData.specifications_desing))]),t._v(" "),n("p",[n("b",[t._v("Especificaciones de operación: ")]),t._v(t._s(t.viewData.specifications_operation))]),t._v(" "),n("p",[n("b",[t._v("Beneficios: ")]),t._v(t._s(t.viewData.benefits))]),t._v(" "),n("p",[n("b",[t._v("Precio: ")]),t._v("$ 0")]),t._v(" "),n("p",[n("b",[t._v("Inventario: ")]),t._v("0")])])],1)}),[],!1,null,null,null);e.default=component.exports}}]);