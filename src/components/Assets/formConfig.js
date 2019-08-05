export const FIELDS = {
  ASSET_TYPE: "field_977",
  ASSETS_DETAILS: {
    details: [
      { signalsId: "field_199" },
      { control: "field_208" },
      { secondarySignals: "field_1329" }, // HTML url, Link in Knack app
      { modifiedBy: "field_703" }, // field_703 is HTML
      { modified: "field_205" },
      { type: "field_201" },
      { owner: "field_202" },
      { funding: "field_1510" },
      { bikeSignal: "field_1877" },
      { status: "field_491" },
      { turnOnDate: "field_204" },
      { map: "field_210" }, // field_210 is HTML <a>
    ],
    components: [
      { pedestrianSignal: "field_1322" },
      { firmware: "field_1563" },
      { firmwareStatusDate: "field_1564" },
    ],
    location: [
      { locationId: "field_209" }, // HTML url
      { signalEngineerArea: "field_188_raw" }, // field_188 is HTML
      { councilDistrict: "field_189_raw" }, // raw is an Array, field_189 is HTML
      { jurisdiction: "field_209.field_190_raw" },
    ],
    communications: [
      { commStatus: "field_1491" },
      { commStatusDatetime: "field_1492" },
    ],
    cabinet: [
      { cabinetType: "field_1788_raw" }, // field_1788 is HTML
      { UPS: "field_1785" }, // HTML, field_1785 is boolean]
    ],
  },
  ASSETS_SERVICE_REQUESTS: [
    { issueId: "field_1678" },
    { issue: "field_1663" },
    { issueReported: "field_1556" },
    { details: "field_1446" },
    { source: "field_1690" },
    { created: "field_1517" },
    { updated: "field_1385" },
    { status: "field_1636" },
  ],
  ASSETS_DETECTORS: [
    { detectorId: "field_1526" },
    { direction: "field_1525" },
    { movement: "field_1524" },
    { type: "field_1527" },
    { statusDate: "field_1587" },
    { status: "field_1529" },
    { detectorIP: "field_1570" },
    { port: "field_1999" },
    { comment: "field_1547" },
  ],
  ASSETS_PREVENTATIVE_MAINTENANCE: [
    { fiscalYear: "field_1252" },
    { completedBy: "field_2076" },
    { createdBy: "field_2077" },
    { workOrder: "field_1243" },
    { completedDate: "field_1241" },
    { status: "field_1244" },
  ],
  ASSETS_WORK_ORDERS: [
    { status: "field_459" },
    { workTypeTroubleCall: "field_976" },
    { workTypeScheduled: "field_900" },
    { problemFound: "field_1351" },
    { actionTaken: "field_1352" },
    { lead: "field_1754" },
    { createdDate: "field_849" },
    { id: "field_1209" },
  ],
  ASSETS_MAP: {
    name: "field_1058",
    location: "field_182_raw",
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
