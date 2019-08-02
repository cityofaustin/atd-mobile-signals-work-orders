export const FIELDS = {
  ASSET_TYPE: "field_977",
  ASSETS_DETAILS: {
    details: {
      signalsId: "field_199",
      control: "field_208",
      secondarySignals: "field_1329", // HTML url, Link in Knack app
      modifiedBy: "field_703_raw", // field_703 is HTML
      modified: "field_205",
      type: "field_201",
      owner: "field_202",
      funding: "field_1510",
      bikeSignal: "field_1877",
      status: "field_491",
      turnOnDate: "field_204",
      map: "field_210_raw", // Link in Knack app, field_210 is HTML <a>
    },
    components: {
      pedestrianSignal: "field_1322",
      firmware: "field_1563",
      firmwareStatusDate: "field_1564",
    },
    locations: {
      locationId: "field_209", // HTML url
      signalEngineerArea: "field_188_raw", // field_188 is HTML
      councilDistrict: "field_189_raw", // raw is an Array, field_189 is HTML
      jurisdiction: "field_209.field_190_raw",
    },
    communications: {
      commStatus: "field_1491",
      commStatusDatetime: "field_1492",
      cabinetType: "field_1788_raw", // field_1788 is HTML
      UPS: "field_1785", // HTML, field_1785 is boolean
    },
  },
  ASSETS_MAP: {
    name: "field_1058",
    latitude: "field_182_raw.latitude",
    longitude: "field_182_raw.longitude",
  },
  // ASSIGN_TO_SELF: "field_1752",
};

// export const ASSET_TYPE_OPTIONS = [
//   "Signal",
//   "School Beacon",
//   "Hazard Flasher",
//   "Digital Messaging Sign (DMS)",
//   "Camera",
//   "Sensor",
//   "Other / No Asset",
// ];
