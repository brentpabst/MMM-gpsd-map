/* Magic Mirror
 * Module: MMM-gpsd
 *
 * MIT Licensed.
 */
Module.register("MMM-gpsd-map", {
  // Default module config.
  defaults: {
    header: "GPS Map",

    width: "150px",
    height: "100px",

    tileServerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    apiKey: "",
    maxZoom: 15,
    dynamicZoom: true
  },

  start: function () {
    Log.log("Starting module: " + this.name);

    this.map = null;
    this.lat = 0;
    this.lon = 0;
    this.track = 0;
    this.speed = 0;
  },

  getScripts: function () {
    return [this.file("node_modules/leaflet/dist/leaflet.js")];
  },

  getStyles: function () {
    return [this.file("node_modules/leaflet/dist/leaflet.css")];
  },

  getHeader: function () {
    return this.config.header;
  },

  getDom: function () {
    var self = this;
    var mapid = document.createElement("div");
    mapid.innerHTML = self.map;
    mapid.style.height = this.config.height;
    mapid.style.width = this.config.width;

    self.map = L.map(mapid, {
      attributionControl: false,
      zoomControl: false
    }).setView([this.lat, this.lon], this.config.maxZoom);

    setTimeout(function () {
      self.map.invalidateSize();
    }, 100);

    var marker = L.marker([this.lat, this.lon], { title: "marker" }).addTo(
      self.map
    );

    this.centerLeafletMapOnMarker(this.map, marker);

    L.tileLayer(this.config.tileServerUrl).addTo(self.map);

    if (this.config.apiKey) {
      L.tileLayer(
        "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" +
          this.config.apiKey
      ).addTo(self.map);
    }

    return mapid;
  },

  notificationReceived: function (notification, payload, sender) {
    var self = this;
    if (notification === "GPS_DATA") {
      if (payload.class === "TPV") {
        this.lat = payload.lat;
        this.lon = payload.lon;
        this.track = payload.track;
        this.speed = payload.speed;
        this.map.eachLayer(function (layer) {
          if (layer.options.title === "marker") {
            layer.setLatLng([self.lat, self.lon]);
            self.centerLeafletMapOnMarker(self.map, layer);
          }
        });
      }
    }
  },

  centerLeafletMapOnMarker: function (map, marker) {
    var latLngs = [marker.getLatLng()];
    var markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds, { maxZoom: this.getZoomFromSpeed(this.speed) });
  },

  getZoomFromSpeed: function (speed) {
    if (!this.config.dynamicZoom) {
      return this.config.maxZoom;
    }

    var min = 2.2352, // 5mph
      slow = 11.176, // 25mph
      med = 19.66976, // 44mph
      fast = 26.8224; // 60mph

    if (speed <= min) {
      return 18;
    } else if (speed <= slow && speed > min) {
      return 15;
    } else if (speed <= med && speed > slow) {
      return 13;
    } else if (speed <= fast && speed > med) {
      return 10;
    } else if (speed > fast) {
      return 8;
    } else {
      return this.config.maxZoom;
    }
  }
});
