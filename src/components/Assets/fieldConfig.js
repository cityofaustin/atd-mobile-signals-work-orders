export const FIELDS = {
  ASSET_TYPE: "field_977",
  ASSETS_DETAILS: {
    details: [
      { signalsId: "field_199" },
      { control: "field_208" },
      { secondarySignals: "field_1329" },
      { modifiedBy: "field_703" },
      { modified: "field_205" },
      { type: "field_201" },
      { owner: "field_202" },
      { funding: "field_1510" },
      { bikeSignal: "field_1877" },
      { status: "field_491" },
      { turnOnDate: "field_204" },
      { map: "field_210" },
    ],
    components: [
      { pedestrianSignal: "field_1322" },
      { firmware: "field_1563" },
      { firmwareStatusDate: "field_1564" },
    ],
    location: [
      { locationId: "field_209" },
      { signalEngineerArea: "field_188_raw" },
      { councilDistrict: "field_189_raw" },
      { jurisdiction: "field_209.field_190_raw" },
    ],
    communications: [
      { commStatus: "field_1491" },
      { commStatusDatetime: "field_1492" },
    ],
    cabinet: [{ cabinetType: "field_1788_raw" }, { UPS: "field_1785" }],
  },
  TABLES: [
    {
      CAMERAS: [
        { id: "field_947" },
        { status: "field_877" },
        { cameraIp: "field_638" },
        { cameraType: "field_639" },
      ],
    },
    {
      SERVICE_REQUESTS: [
        { issueId: "field_1678" },
        { issue: "field_1663" },
        { issueReported: "field_1556" },
        { details: "field_1446" },
        { source: "field_1690" },
        { created: "field_1517" },
        { updated: "field_1385" },
        { status: "field_1636" },
      ],
    },
    {
      WORK_ORDERS: [
        { status: "field_459" },
        { workTypeTroubleCall: "field_976" },
        { workTypeScheduled: "field_900" },
        { problemFound: "field_1351" },
        { actionTaken: "field_1352" },
        { lead: "field_1754" },
        { createdDate: "field_849" },
        { id: "field_1209" },
      ],
    },
    {
      PREVENTATIVE_MAINTENANCE: [
        { fiscalYear: "field_1252" },
        { completedBy: "field_2076" },
        { createdBy: "field_2077" },
        { workOrder: "field_1243" },
        { completedDate: "field_1241" },
        { status: "field_1244" },
      ],
    },
    {
      FILE_ATTACHMENTS: [
        { file: "field_2002" },
        { name: "field_2003" },
        { uploadedBy: "field_2005" },
        { lastUpdated: "field_2007" },
      ],
    },
    {
      DETECTION: [
        { details: "id-detector-link" }, // Add -link for link handling in AssetTable component
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
    },
    {
      SIGNAL_PRIORITY: [
        { priorityId: "field_2906" },
        { priorityDirection: "field_2908" },
        { priorityMovement: "field_2910" },
        { phases: "field_2914" },
        { priorityType: "field_2911" },
        { priorityDetectorStatus: "field_2909" },
        { comments: "field_2912" },
      ],
    },
    {
      POLE_ATTACHMENTS: [
        { description: "field_1807" },
        { provider: "field_1808" },
        { intQuadrant: "field_1814" },
        { installDate: "field_1815" },
        { status: "field_1817" },
      ],
    },
    {
      TRAVEL_SENSORS: [
        { sensorIp: "field_687" },
        { status: "field_882" },
        { sensorType: "field_884" },
        { commStatus: "field_1478" },
        { commStatusDatetime: "field_1480" },
      ],
    },
    {
      APS_BUTTON_REQUESTS: [
        { requestDate: "field_2739" },
        { requestStatus: "field_2740" },
      ],
    },
  ],
  ASSETS_MAP: {
    name: "field_1058",
    location: "field_182_raw",
  },
  CAD: {
    cadStatus: [
      { cadId: "field_1750" },
      { drawingsAsBuilt: "field_1746" },
      { existingDrawing: "field_1742" },
      { phasingDrawing: "field_1743" },
      { signsAndMarkingsDrawing: "field_1744" },
      { cadDrawing: "field_1735" },
      { engineerSigned: "field_1749" },
      { quantity: "field_1745" },
      { constructionDrawing: "field_1741" },
    ],
  },
};
