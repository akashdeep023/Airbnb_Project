// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapToken;                      //show.ejs ke script se mapToken
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",        // style URL
  center: listing.geometry.coordinates,               // starting position [lng, lat]
  zoom: 1,                                            // starting zoom
});

// console.log(coordinates);                          //show.ejs ke script se coordinates

const marker1 = new mapboxgl.Marker({ color: "red" }) //add marker in map
  .setLngLat(listing.geometry.coordinates)            //Listing.geometry.coordinates
  .setPopup(                                          //add popup in marker
    new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${listing.title}</h6><p><b>${listing.location}, ${listing.country}</b></p><p>Exact location will be provided after booking!</p>`)) 
  .addTo(map);

// ---------------- auto zoom animated transition--------------------------------
map.zoomTo(12, {
  duration: 8000,
  offset: [0, 0],
});

map.setMaxZoom(18.75);
map.scrollZoom.disable();

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
// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 100, 100, ${1 - t})`;
    context.fill();

    // Draw the inner circle.
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 75, 75, 10)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();

    // Return `true` to let the map know that the image was updated.
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
            coordinates: listing.geometry.coordinates, // icon position [lng, lat]
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
