(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{499:function(e,t,r){var content=r(533);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("0ace817b",content,!0,{sourceMap:!1})},532:function(e,t,r){"use strict";var n=r(499);r.n(n).a},533:function(e,t,r){(t=r(18)(!1)).push([e.i,'.number-center{display:block;text-align:center;color:#000;font-size:25px}.number-center.in_process,.number-center.pending{color:purple}.card-info-dash .el-card__header{background:purple;color:#fff}.box-activity{padding:0}.board-tech{padding-top:20px}.title-home{padding:20px 15px}.body-home{min-height:80vh;padding:15px}.clearfix:after,.clearfix:before{display:table;content:""}.clearfix:after{clear:both}.box-card{margin-top:15px}.filters-report{display:block;padding:15px 0}.filters-report p{padding:15px 0}.filters-report .i-block{display:inline-block}',""]),e.exports=t},554:function(e,t,r){"use strict";r.r(t);r(20);var n=r(3),o=r(0),c=r.n(o),l={layout:"dashboard",middleware:["auth"],head:function(){return{title:"Diken - Dashboard"}},data:function(){return{activities:[],technicals:[],reportServices:[],pending_services:0,finished_services:0,in_process_services:0,total:0,params:{limit:50,page:1,service_begin:"2020-10-01",service_end:"2020-10-10",technical_id:"",report_status:""}}},methods:{downloadReport:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.params.download=!0,e.$axios.get("//api.diken.mx/api/report/services",{params:e.params,responseType:"blob"}).then((function(e){var t=new Blob([e.data],{type:"application/vnd.ms-excel"}),r=window.URL.createObjectURL(t),a=document.createElement("a");a.href=r,a.download="Reporte de servicios "+c()().format("MMMM Do YYYY")+" .xlsx",a.click(),window.URL.revokeObjectURL(r)})).catch((function(e){console.log(e)}));case 2:case"end":return t.stop()}}),t)})))()},getReport:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("//api.diken.mx/api/report/services",{params:e.params});case 2:r=t.sent,e.reportServices=r.data.services.rows,e.total=r.data.services.total,e.pending_services=r.data.pending_services,e.finished_services=r.data.finished_services,e.in_process_services=r.data.in_process_services,e.$notify({title:"Reporte actualizado correctamente",type:"success"});case 9:case"end":return t.stop()}}),t)})))()},getTechnicals:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("//api.diken.mx/api/users/",{params:{role:"tecnico"}});case 2:r=t.sent,e.technicals=r.data.rows;case 4:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.params.limit=e,r.next=3,t.getReport();case 3:case"end":return r.stop()}}),r)})))()},HandleCurrentPage:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.params.page=e,r.next=3,t.getReport();case 3:case"end":return r.stop()}}),r)})))()},transformDate:function(e){return e.format("YYYY-MM-DD")},refreshReport:function(){this.getReport()}},fetch:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.params.service_begin=e.transformDate(c()(e.now).locale("es-mx").startOf("month")),e.params.service_end=e.transformDate(c()(e.now).locale("es-mx").endOf("month")),t.next=4,e.getReport();case 4:return t.next=6,e.getTechnicals();case 6:case"end":return t.stop()}}),t)})))()}},d=(r(532),r(10)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"body-home"},[r("el-row",{attrs:{gutter:15}},[r("el-col",{staticClass:"title-home",attrs:{md:24}},[r("h1",[e._v("Hola, "+e._s(e.$auth.$state.user.name))])]),e._v(" "),r("el-col",{attrs:{md:8}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Enlaces importantes")])]),e._v(" "),r("el-link",{attrs:{type:"primary",href:"https://dikeninternational.com/mex/universidad-diken-online/",target:"_blank"}},[e._v("Universidad Diken")]),e._v(" "),r("el-divider"),e._v(" "),r("el-link",{attrs:{type:"primary",href:"https://www.dikeninternational.com/bigdata/signin.php",target:"_blank"}},[e._v("Big data")]),e._v(" "),r("el-divider"),e._v(" "),r("el-link",{attrs:{type:"primary",href:"https://www.dikeninternational.com/auditorias/",target:"_blank"}},[e._v("Auditoría")])],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{md:24}},[r("div",{staticStyle:{padding:"25px 15px"}},[r("h3",{staticStyle:{color:"#0767C6"}},[e._v("Reporte de servicios")]),e._v(" "),r("p",[e._v("Reporte de servicios de la fecha "+e._s(e.$convertDate(e.params.service_begin))+" a "+e._s(e.$convertDate(e.params.service_end)))]),e._v(" "),r("el-row",{staticStyle:{padding:"20px 0"},attrs:{gutter:15}},[r("el-col",{attrs:{md:6}},[r("el-card",{staticClass:"box-card card-info-dash"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Servicios pendientes")])]),e._v(" "),r("div",{staticClass:"number-center pending"},[e._v("\n                "+e._s(e.pending_services)+"\n              ")])])],1),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-card",{staticClass:"box-card card-info-dash"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Servicios terminados")])]),e._v(" "),r("div",{staticClass:"number-center "},[e._v("\n                "+e._s(e.finished_services)+"\n              ")])])],1),e._v(" "),r("el-col",{attrs:{md:6}},[r("el-card",{staticClass:"box-card card-info-dash"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Servicios en progreso")])]),e._v(" "),r("div",{staticClass:"number-center in_process"},[e._v("\n                "+e._s(e.in_process_services)+"\n              ")])])],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{md:24}},[r("b",[e._v("Filtros:")]),e._v(" "),r("div",{staticClass:"filters-report"},[r("div",{staticClass:"i-block"},[r("p",[e._v("Fecha de inicio")]),e._v(" "),r("el-date-picker",{attrs:{format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",type:"date"},model:{value:e.params.service_begin,callback:function(t){e.$set(e.params,"service_begin",t)},expression:"params.service_begin"}})],1),e._v(" "),r("div",{staticClass:"i-block"},[r("p",[e._v("Fecha de fin")]),e._v(" "),r("el-date-picker",{attrs:{format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",type:"date"},model:{value:e.params.service_end,callback:function(t){e.$set(e.params,"service_end",t)},expression:"params.service_end"}})],1),e._v(" "),e.$currentRole(["admin"])?r("div",{staticClass:"i-block"},[r("p",[e._v("Tecnico responsable")]),e._v(" "),r("el-select",{model:{value:e.params.technical_id,callback:function(t){e.$set(e.params,"technical_id",t)},expression:"params.technical_id"}},[r("el-option",{attrs:{label:"Todos",value:""}}),e._v(" "),e._l(e.technicals,(function(e){return r("el-option",{attrs:{label:e.name,value:e.id}})}))],2)],1):e._e(),e._v(" "),r("div",{staticClass:"i-block"},[r("p",[e._v("Estatus de servicio")]),e._v(" "),r("el-select",{model:{value:e.params.report_status,callback:function(t){e.$set(e.params,"report_status",t)},expression:"params.report_status"}},[r("el-option",{attrs:{label:"Todos",value:""}}),e._v(" "),r("el-option",{attrs:{label:"Pendiente",value:"pendiente"}}),e._v(" "),r("el-option",{attrs:{label:"Terminado",value:"terminado"}}),e._v(" "),r("el-option",{attrs:{label:"En proceso",value:"en_proceso"}})],1)],1),e._v(" "),r("div",{staticClass:"i-block"},[r("el-button",{attrs:{type:"primary"},on:{click:e.refreshReport}},[e._v("Aplicar")])],1)])])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{md:12}},[r("div",[e.total>=1?r("el-button",{attrs:{type:"success"},on:{click:e.downloadReport}},[e._v("Descargar reporte")]):e._e()],1)]),e._v(" "),r("el-col",{attrs:{md:12}},[r("div",{staticStyle:{"text-align":"right"}},[e.total>=1?r("el-pagination",{staticClass:"custom-paginator",attrs:{"page-sizes":[50,100,200],"page-size":50,layout:"sizes, prev, pager, next",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.HandleCurrentPage}}):e._e()],1)])],1)],1),e._v(" "),r("div",{staticStyle:{"overflow-x":"auto"}},[r("el-table",{staticStyle:{width:"100%","min-height":"400px"},attrs:{data:e.reportServices}},[r("el-table-column",{attrs:{prop:"report_status",label:"Estatus",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"technical_name",label:"Tecnico",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"service_begin",label:"Fecha de inicio",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{label:"Actividad",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("p",[e._v(e._s(e.$getActivity(t.row.activity_type)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"Tipo de Act.",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("p",[e._v(e._s(e.$getTypeOfActivity(t.row.services_type)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"Progreso",width:"120"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("el-progress",{attrs:{percentage:e.row.service_progress}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"client_name",label:"Cliente",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{label:"Costos extras",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("p",[e._v("$ "+e._s(t.row.extra_total_costs||"0"))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"Costo de refacciones",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("p",[e._v("$ "+e._s(t.row.repairs_total_cost||"0"))])]}}])})],1)],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);