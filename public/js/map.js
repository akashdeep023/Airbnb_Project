mapboxgl.accessToken = mapToken;                      
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",       
  center: listing.geometry.coordinates,               
  zoom: 1,  
  cooperativeGestures: true                                      
});
const marker1 = new mapboxgl.Marker({ color: "red" }) 
  .setLngLat(listing.geometry.coordinates)            
  .setPopup(                                        
    new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${listing.title}</h6><p><b>${listing.location}, ${listing.country}</b></p><p>Exact location will be provided after booking!</p>`)) 
  .addTo(map);

// ---------------- auto zoom animated transition--------------------------------
map.zoomTo(12, {
  duration: 8000,
  offset: [0, 0],
});

map.setMaxZoom(18.75);
// map.scrollZoom.disable();

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  })
);

map.addControl(new mapboxgl.FullscreenControl());

// ----------------zoomin - zoomout button----------------------------------------
let zoomin = () => {
  console.log("zoom in");
  console.log(map.getZoom());
  let zoomP = map.getZoom();
  if (zoomP < 18) {
    zoomP++;
  }
  map.zoomTo(zoomP);
};
let zoomout = () => {
  console.log("zoom out");
  console.log(map.getZoom());
  let zoomM = map.getZoom();
  if (zoomM > 0) {
    zoomM--;
  }
  map.zoomTo(zoomM);
};

// ----------------Add an animated icon to the map------------------------------
const size = 200;
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 100, 100, ${1 - t})`;
    context.fill();

    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 75, 75, 10)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    this.data = context.getImageData(0, 0, this.width, this.height).data;

    map.triggerRepaint();

    return true;
  },
};

map.on("load", () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
  map.addSource("dot-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: listing.geometry.coordinates, 
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "dot-point",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
});
