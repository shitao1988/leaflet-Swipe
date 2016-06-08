

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


 var map = new L.Map('map', {
   center: [30.258, 120.1556],
   zoom: 8,
   layers: [cities]
 });

 L.marker([30.258, 120.1556]).addTo(map)
      .bindPopup("<b>Hello world!</b><br />I<br /><br /><br /><br /><br /><br />a popup.",{position:'right'}).openPopup();


 