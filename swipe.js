 lt5 = L.tileLayer("http://t0.tianditu.cn/vec_w/wmts?" +
   "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
   "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
     minZoom: 4,
     maxZoom: 18
   });

 lt2 = L.tileLayer("http://t0.tianditu.com/cva_w/wmts?" +
   "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
   "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
     minZoom: 4,
     maxZoom: 18
   });

 var cities = L.layerGroup([lt5, lt2]);

 img = L.tileLayer("http://t0.tianditu.cn/img_w/wmts?" +
   "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
   "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
     minZoom: 4,
     maxZoom: 18
   });

 latlng = new L.LatLng(30.52, 114.37);
 var map = new L.Map('map', {
   center: [30.258, 120.1556],
   zoom: 8,
   layers: [cities, img]
 });

 map.on('contextmenu', function(e) {});
 var mouselocation = '';
 var l_parent = getLayer(map._layers)._container,

   dragging = false;
 var container = L.DomUtil.create('div', 'swipe', document.body);
 container.id = 'swipe1';
 var swiperigth = L.DomUtil.create('div', 'swiperigth', container);
 var swipeleft = L.DomUtil.create('div', 'swipeleft', container);
 var swipetop = L.DomUtil.create('div', 'swipetop', container);
 var swipebottom = L.DomUtil.create('div', 'swipebottom', container);

 swipetop.onmousemove = function() {
   if (dragging)
     return;
   container.style.cursor = 's-resize';
   mouselocation = 'top';
 };
 swipebottom.onmousemove = function() {
   if (dragging)
     return;
   container.style.cursor = 's-resize';
   mouselocation = 'bottom';
 };
 swiperigth.onmousemove = function() {
   if (dragging)
     return;
   container.style.cursor = 'w-resize';
   mouselocation = 'right';
 };
 swipeleft.onmousemove = function() {
   if (dragging)
     return;
   container.style.cursor = 'e-resize';
   mouselocation = 'left';
 };


 container.onmousedown = function() {
   dragging = true;
   return false;
 };

 document.onmouseup = function() {
   dragging = false;
   mouseup = true;
   setDivide(0);
 };
 document.onmousemove = function(e) {
   if (!dragging)
     return;

   switch (mouselocation) {
     case 'top':
       setTopDivide(e.screenY);
       break;
     case 'left':
       setDivide(e.screenX);
       break;
     case 'bottom':
       setBotttomDivide(e.screenY);
       break;
     case 'right':
       setRightDivide(e.screenX);
       break;
     default:
       break;
   };


 };


 function setDivide(x) {

   var nw = map.containerPointToLayerPoint([0, 0]),
     se = map.containerPointToLayerPoint(map.getSize()),
     layerX = map.containerPointToLayerPoint(x, 0).x;
   l_parent.style.clip = 'rect(' + [nw.y, layerX, se.y, nw.x].join('px,') + 'px)';

 }

 function setRightDivide(x) {

   var nw = map.containerPointToLayerPoint([0, 0]),
     se = map.containerPointToLayerPoint(map.getSize()),
     layerX = map.containerPointToLayerPoint(x, 0).x;
   l_parent.style.clip = 'rect(' + [nw.y, se.x, se.y, layerX].join('px,') + 'px)';

 }

 function setTopDivide(ypoint) {

   var nw = map.containerPointToLayerPoint([0, 0]),
     se = map.containerPointToLayerPoint(map.getSize()),
     layerY = map.containerPointToLayerPoint(L.point(0, ypoint)).y - 100;
   l_parent.style.clip = 'rect(' + [nw.y, se.x, layerY, nw.x].join('px,') + 'px)';

 }

 function setBotttomDivide(ypoint) {

   var nw = map.containerPointToLayerPoint([0, 0]),
     se = map.containerPointToLayerPoint(map.getSize()),
     layerY = map.containerPointToLayerPoint(L.point(0, ypoint)).y - 100;
   l_parent.style.clip = 'rect(' + [layerY, se.x, se.y, nw.x].join('px,') + 'px)';

 }

 function getLayer(obj) {
   var last;
   for (var i in obj) {
     if (obj.hasOwnProperty(i) && typeof(i) !== 'function') {
       last = obj[i];
     }
   }
   return last;
 }

 setDivide(0);