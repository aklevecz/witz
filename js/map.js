//map
var witzLink="https://www.google.de/maps/place/witz+hummus/@52.4908947,13.4043038,15z/data=!4m5!3m4!1s0x0:0xe6667ee7f55334c2!8m2!3d52.4908947!4d13.4043038";
mapboxgl.accessToken = 'pk.eyJ1IjoidGVoLXJhcHRvciIsImEiOiJjamdmZDExMTYyaXVnMnhxZTN6ZDNncmxnIn0.PZyUBVM9BCLM65ozSvBb1A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/teh-raptor/cjgfdeh4m001i2slkkgq9d4ra',
  center: [13.404307, 52.490925],
  zoom: 7
});

var geojson = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [13.404307, 52.490925]
  },
  "properties": {
    "name": "witz hummus",
    "description": "hummus hummus hummus hummus hummus hummus "
  }
}
//remove their logo hehe
document.getElementsByClassName('mapboxgl-ctrl-logo')[0].remove();
document.getElementsByClassName('mapboxgl-ctrl-bottom-right')[0].remove();
// add markers to map
// create a HTML element for each feature
var tint = document.createElement('svg');
tint.className = 'tint';

var el = document.createElement('div');
el.className = 'marker';

tint.onclick = zoomToFeature;
el.onclick = zoomToFeature;
function zoomToFeature() {
    map.flyTo({center: [13.404307, 52.490925],zoom:17});
}


function generateMap() {
unMap.style.display = "block";
document.getElementById('map').style.display = "block";
map.resize();
// make a marker for each feature and add to the map

new mapboxgl.Marker(tint)
.setLngLat(geojson.geometry.coordinates)
.addTo(map);

new mapboxgl.Marker(el)
.setLngLat(geojson.geometry.coordinates)
.addTo(map);

new mapboxgl.Marker(tint)
.setLngLat(geojson.geometry.coordinates)
.addTo(map);



new mapboxgl.Marker(el)
  .setLngLat(geojson.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<h3>' + geojson.properties.name + '</h3><p>' + geojson.properties.description + '<br/><a style="color:red" href="'+witzLink+'">**GO**</a></p>'))
  .addTo(map);

}