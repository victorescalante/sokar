(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{483:function(e,t,r){var o,n,l;n=[],void 0===(l="function"==typeof(o=function(){return function e(data,t,r){var o,n,l=window,c="application/octet-stream",d=r||c,v=data,m=!t&&!r&&v,f=document.createElement("a"),_=function(a){return String(a)},h=l.Blob||l.MozBlob||l.WebKitBlob||_,w=t||"download";if(h=h.call?h.bind(l):Blob,"true"===String(this)&&(d=(v=[v,d])[0],v=v[1]),m&&m.length<2048&&(w=m.split("/").pop().split("?")[0],f.href=m,-1!==f.href.indexOf(m))){var y=new XMLHttpRequest;return y.open("GET",m,!0),y.responseType="blob",y.onload=function(t){e(t.target.response,w,c)},setTimeout((function(){y.send()}),0),y}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(v)){if(!(v.length>2096103.424&&h!==_))return navigator.msSaveBlob?navigator.msSaveBlob(R(v),w):k(v);d=(v=R(v)).type||c}else if(/([\x80-\xff])/.test(v)){for(var i=0,x=new Uint8Array(v.length),C=x.length;i<C;++i)x[i]=v.charCodeAt(i);v=new h([x],{type:d})}function R(e){for(var t=e.split(/[:;,]/),r=t[1],o=("base64"==t[2]?atob:decodeURIComponent)(t.pop()),n=o.length,i=0,l=new Uint8Array(n);i<n;++i)l[i]=o.charCodeAt(i);return new h([l],{type:r})}function k(e,t){if("download"in f)return f.href=e,f.setAttribute("download",w),f.className="download-js-link",f.innerHTML="downloading...",f.style.display="none",document.body.appendChild(f),setTimeout((function(){f.click(),document.body.removeChild(f),!0===t&&setTimeout((function(){l.URL.revokeObjectURL(f.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,c)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var r=document.createElement("iframe");document.body.appendChild(r),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,c)),r.src=e,setTimeout((function(){document.body.removeChild(r)}),333)}if(o=v instanceof h?v:new h([v],{type:d}),navigator.msSaveBlob)return navigator.msSaveBlob(o,w);if(l.URL)k(l.URL.createObjectURL(o),!0);else{if("string"==typeof o||o.constructor===_)try{return k("data:"+d+";base64,"+l.btoa(o))}catch(e){return k("data:"+d+","+encodeURIComponent(o))}(n=new FileReader).onload=function(e){k(this.result)},n.readAsDataURL(o)}return!0}})?o.apply(t,n):o)||(e.exports=l)},494:function(e,t,r){var content=r(522);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("c6ca9d00",content,!0,{sourceMap:!1})},521:function(e,t,r){"use strict";var o=r(494);r.n(o).a},522:function(e,t,r){(t=r(18)(!1)).push([e.i,".details-product .warranty .text,.images-upload{padding:15px 0}.details-product .warranty .c-button{padding:15px 0;text-align:center}.details-product .form-product .el-checkbox{display:block;width:100%}.details-product .form-product .lineal-form>label{display:block;width:100%;text-align:left;font-weight:700}.details-product .content-info,.details-product .formats{padding:25px 0}.details-product .content-info .box-card{margin-top:15px}.details-product .content-info .box-card span{font-weight:700}.details-product .content-info .box-card .card-details p{color:#5d3ce7;padding:15px 0}",""]),e.exports=t},543:function(e,t,r){"use strict";r.r(t);r(20);var o=r(3),n=r(483),l=r.n(n),c=r(481),d=r.n(c),v={layout:"dashboard",middleware:["auth"],head:function(){return{title:"Producto Relacionado"}},data:function(){return{form:{product_user:0,services:["Ayuda Visual","Manual de Equipo","Carta Garantia","Capacitación"],functionality:"e",foam:"e"},product_user:{},product_type:"own",dialogImageUrl:"",dialogVisible:!1,upload:{url:"http://23.23.191.60/api/files",headers:{Authorization:this.$auth.getToken("local")},data:{model_id:"",model:0},list:[]}}},methods:{saveFile:function(e){return{category:e,model_id:this.upload.data.model_id,model:this.upload.data.model}},filterImagesByCategory:function(e){return d.a.filter(this.upload.list,{category:e})},handleRemove:function(e,t){var r=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.$axios.$delete("http://23.23.191.60/api/files/"+e.id);case 2:case"end":return t.stop()}}),t)})))()},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},downloadFormatReception:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post("http://23.23.191.60/api/download/file/reception",e.form);case 2:r=t.sent,l()(atob(r),"archivo.pdf","application/pdf");case 4:case"end":return t.stop()}}),t)})))()},downloadFormatWarranty:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post("http://23.23.191.60/api/download/file/warranty",e.form);case 2:r=t.sent,l()(atob(r),"warranty.pdf","application/pdf");case 4:case"end":return t.stop()}}),t)})))()},getProductUser:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("http://23.23.191.60/api/clients/"+e.$route.params.client_id+"/product-relation/"+e.$route.params.id);case 2:data=t.sent,e.product_user=data.data.product_user,e.form.product_user=data.data.product_user.id,e.product_type=data.data.product_user.product_type,e.upload.data.model=data.data.product_user.model,e.upload.data.model_id=data.data.product_user.id,e.upload.list=d.a.map(data.data.product_user.files,(function(e){return{name:"name",url:e.url,id:e.id,category:e.category}}));case 9:case"end":return t.stop()}}),t)})))()}},fetch:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getProductUser();case 2:case"end":return t.stop()}}),t)})))()},fetchOnServer:!1},m=(r(521),r(10)),component=Object(m.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"details-product"},[r("h2",[e._v("Detalle del equipo")]),e._v(" "),r("br"),e._v(" "),r("p",[e._v("El detalle del producto contiene la información relacionada del producto.")]),e._v(" "),e.$fetchState.pending?r("p",{staticClass:"primary-color"},[e._v("Cargando datos del producto ...")]):r("div",[r("el-row",{staticClass:"content-info",attrs:{gutter:15}},[r("el-col",{attrs:{md:8}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Producto")])]),e._v(" "),r("p",[e._v("Nombre del producto")]),e._v(" "),r("strong",[e._v(e._s(e.product_user.product.name))])]),e._v(" "),r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Cliente")])]),e._v(" "),r("p",[e._v("Nombre del cliente")]),e._v(" "),r("strong",[e._v(e._s(e.product_user.client.name))])])],1),e._v(" "),r("el-col",{attrs:{md:16}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Detalle del producto asociado al cliente")])]),e._v(" "),r("el-row",{staticClass:"card-details"},[r("el-col",{attrs:{md:24}},[r("p",[e._v("Número de serie")]),e._v(" "),r("strong",[e._v(e._s(e.product_user.serial_number))])])],1),e._v(" "),r("el-row",{staticClass:"card-details"},[r("el-col",{attrs:{md:8}},[r("p",[e._v("Estatus")]),e._v(" "),r("strong",[e._v(e._s(e.$statusProduct(e.product_user.status)))])]),e._v(" "),r("el-col",{attrs:{md:8}},[r("p",[e._v("Tipo de producto")]),e._v(" "),r("strong",[e._v(e._s(e.$typeProduct(e.product_user.product_type)))])])],1),e._v(" "),r("el-row",{staticClass:"card-details"},[r("el-col",{attrs:{md:8}},[r("p",[e._v("Último servicio")]),e._v(" "),r("strong",[e._v(e._s(e.$convertDate(e.product_user.last_service)))])]),e._v(" "),r("el-col",{attrs:{md:8}},[r("p",[e._v("Proximo servicio")]),e._v(" "),r("strong",[e._v(e._s(e.$convertDate(e.product_user.next_service)))])]),e._v(" "),r("el-col",{attrs:{md:8}},[r("p",[e._v("Periodo de servicio")]),e._v(" "),r("strong",[e._v(" cada "+e._s(e.product_user.period_service)+" días")])]),e._v(" "),r("el-col",{attrs:{md:8}},[r("p",[e._v("Registro de producto")]),e._v(" "),r("strong",[e._v(" "+e._s(e.$convertDate(e.product_user.created_at)))])])],1)],1)],1)],1),e._v(" "),r("el-row",{staticClass:"formats",attrs:{gutter:15}},[r("el-card",[r("el-col",{attrs:{md:12}},[r("strong",{staticClass:"primary-color"},[e._v("Carta de recepción y liberación ")]),e._v(" "),r("br"),r("br"),e._v(" "),r("p",[e._v("Revisa la información para la generación de la carta de recepción y liberación.")]),e._v(" "),r("br"),e._v(" "),r("p",[r("b",[e._v("Equipo:")]),e._v(" "+e._s(e.product_user.product.name))]),e._v(" "),r("br"),e._v(" "),r("p",[r("b",[e._v("Número de serie:")]),e._v(" "+e._s(e.product_user.serial_number))]),e._v(" "),r("br"),e._v(" "),r("p",[r("b",[e._v("Subir carta de recepción y liberación")])]),e._v(" "),r("br"),e._v(" "),r("div",{staticClass:"images-upload"},[r("el-upload",{attrs:{accept:"image/png, image/jpeg",action:e.upload.url,multiple:!0,headers:e.upload.headers,data:e.saveFile("reception"),"file-list":e.filterImagesByCategory("reception"),"list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)]),e._v(" "),r("el-col",{attrs:{md:12}},[r("br"),e._v(" "),r("p",[r("b",[e._v("Marca las opciones que correspondan a la recepción:")])]),e._v(" "),r("el-form",{ref:"form",staticClass:"form-product",attrs:{model:e.form}},[r("el-row",{staticStyle:{padding:"15px 0"}},[r("el-col",{attrs:{xs:24,md:24}},[r("el-form-item",[r("el-checkbox-group",{attrs:{size:"medium"},model:{value:e.form.services,callback:function(t){e.$set(e.form,"services",t)},expression:"form.services"}},[r("el-checkbox",{attrs:{label:"Ayuda Visual",name:"services"}}),e._v(" "),r("el-checkbox",{attrs:{label:"Manual de Equipo",name:"services"}}),e._v(" "),r("el-checkbox",{attrs:{label:"Carta Garantia",name:"services"}}),e._v(" "),r("el-checkbox",{attrs:{label:"Capacitación",name:"services"}})],1)],1)],1),e._v(" "),r("el-col",{attrs:{xs:24,md:24}},[r("el-form-item",{staticClass:"lineal-form",attrs:{label:"Prueba de funcionalidad"}},[r("el-radio-group",{model:{value:e.form.functionality,callback:function(t){e.$set(e.form,"functionality",t)},expression:"form.functionality"}},[r("el-radio",{attrs:{label:"e"}},[e._v("Excelente")]),e._v(" "),r("el-radio",{attrs:{label:"b"}},[e._v("Bueno")]),e._v(" "),r("el-radio",{attrs:{label:"r"}},[e._v("Regular")])],1)],1),e._v(" "),r("el-form-item",{staticClass:"lineal-form",attrs:{label:"Prueba de espuma"}},[r("el-radio-group",{model:{value:e.form.foam,callback:function(t){e.$set(e.form,"foam",t)},expression:"form.foam"}},[r("el-radio",{attrs:{label:"e"}},[e._v("Excelente")]),e._v(" "),r("el-radio",{attrs:{label:"b"}},[e._v("Bueno")]),e._v(" "),r("el-radio",{attrs:{label:"r"}},[e._v("Regular")])],1)],1)],1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",plain:""},on:{click:e.downloadFormatReception}},[e._v("Generar formato de recepción")])],1)],1)],1)],1)],1),e._v(" "),r("el-row",{staticClass:"warranty"},[r("el-card",{staticStyle:{padding:"15px 0"}},[r("el-col",{attrs:{md:12}},[r("strong",{staticClass:"primary-color"},[e._v("Formato de garantía ")]),e._v(" "),r("br"),r("br"),e._v(" "),r("p",[r("b",[e._v("Subir garantía")])]),e._v(" "),r("br"),e._v(" "),r("div",{staticClass:"images-upload"},[r("el-upload",{attrs:{accept:"image/png, image/jpeg",action:e.upload.url,headers:e.upload.headers,multiple:!0,data:e.saveFile("garantia"),"file-list":e.filterImagesByCategory("garantia"),"list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)]),e._v(" "),r("el-col",{attrs:{md:12}},[r("p",{staticClass:"text"},[e._v("Genera el formato de garantía para este equipo.")]),e._v(" "),r("div",{staticStyle:{padding:"15px 0"}},[r("el-button",{attrs:{type:"primary",plain:""},on:{click:e.downloadFormatWarranty}},[e._v("Generar formato de garantía")])],1)])],1)],1)],1)])}),[],!1,null,null,null);t.default=component.exports}}]);