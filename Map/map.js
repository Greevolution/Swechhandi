import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

console.log("INSIDE map.js");
alert("ABOUT TO USE MAP!");
var raster = new TileLayer({
  source: new OSM(),
});

var source = new VectorSource({wrapX: false});

var vector = new VectorLayer({
  source: source,
});

var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4,
  }),
});

var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value,
    });
    map.addInteraction(draw);
  }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

document.getElementById('undo').addEventListener('click', function () {
  draw.removeLastPoint();
});
document.getElementById('export-png').addEventListener('click', function () {
  map.once('rendercomplete', function () {
    var mapCanvas = document.createElement('canvas');
    var size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    var mapContext = mapCanvas.getContext('2d');
    Array.prototype.forEach.call(
      document.querySelectorAll('.ol-layer canvas'),
      function (canvas) {
        if (canvas.width > 0) {
          var opacity = canvas.parentNode.style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          var transform = canvas.style.transform;
          // Get the transform parameters from the style's transform matrix
          var matrix = transform
            .match(/^matrix\(([^\(]*)\)$/)[1]
            .split(',')
            .map(Number);
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          mapContext.drawImage(canvas, 0, 0);
        }
      }
    );
    if (navigator.msSaveBlob) {
      // link download attribuute does not work on MS browsers
      navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
    } else {
      var link = document.getElementById('image-download');
      link.href = mapCanvas.toDataURL();
      link.click();
    }
  });
  map.renderSync();
});


addInteraction();

//remove feature
// var selectSource = select.getLayer(selectedFeature).getSource();
  //selectSource.removeFeature(selectedFeature);
