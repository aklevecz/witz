//map
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

el.onclick = (e) => zoomToFeature(e);
function zoomToFeature(e) {
    map.setZoom(20);
}


function generateMap() {
document.getElementById('map').style.display = "block";
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



// new mapboxgl.Marker(el)
//   .setLngLat(geojson.geometry.coordinates)
//   .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
//   .setHTML('<h3>' + geojson.properties.name + '</h3><p>' + geojson.properties.description + '</p>'))
//   .addTo(map);

}