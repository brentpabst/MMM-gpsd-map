/* Magic Mirror
 * Module: MMM-gpsd
 *
 * MIT Licensed.
 */
Module.register("MMM-gpsd-map", {
  // Default module config.
  defaults: {
    header: "GPS Map"
  },

  start: function () {
    Log.log("Starting module: " + this.name);
  },

  getHeader: function () {
    return this.config.header;
  }
});
