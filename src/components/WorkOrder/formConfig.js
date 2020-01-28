export const FIELDS = {
  ASSET_TYPE: "field_977",
  ASSETS: {
    signal: {
      fieldId: "field_1060",
      label: "Signal",
    },
    camera: {
      fieldId: "field_1862",
      label: "Camera",
    },
    schoolBeacon: {
      fieldId: "field_1871",
      label: "School Zone",
    },
    hazardFlasher: {
      fieldId: "field_1864",
      label: "Hazard Flasher",
    },
    dms: {
      fieldId: "field_1859",
      label: "DMS",
    },
    sensor: {
      fieldId: "field_1863",
      label: "Sensor",
    },
  },
  ASSIGN_TO_SELF: "field_1752",
  CSR: "field_1235",
  NEW_CSR: "field_1232",
  CSR_LABEL: "field_1887",
  LEAD_TECHNICIAN: "field_1754",
  REPORTED_BY: "field_968",
  SUPPORT_TECHNICIANS: "field_909",
  SCHEDULE_IMMEDIATELY: "field_1006",
  SCHEDULED_DATE: "field_460",
  WORK_DESCRIPTION: "field_463",
  WORK_ORDER_ITEM_QUANTITY: "field_524",
  WORK_ORDER_INVENTORY_ITEMS: "field_513",
  WORK_ORDER_EDIT_INVENTORY_ITEM: "field_513_raw", // Retrieve existing value for edit inv form
  WORK_ORDER_ITEM_SOURCE: "field_3440",
  WORK_ORDER_ITEM_COMMENT: "field_3493",
  WORK_ORDER_ID_FOR_INVENTORY: "field_514", // POST req requires this field to contain the work order ID
  WORK_TYPE: "field_1004",
  WORK_TYPE_TROUBLE_CALL: "field_976",
  WORK_TYPE_SCHEDULED_WORK: "field_900",
  WORK_TYPE_OTHER: "field_1420",
  WORK_SCHEDULED_DATE: "field_460",
  TASK_ORDERS: "field_2634",
  TIMELOG: {
    WORK_ORDER_ID: "field_1424",
    TECHNICIANS: "field_1753",
    EDIT_TECHNICIANS: "field_1753_raw",
    VEHICLES: "field_1427",
    EDIT_VEHICLES: "field_1427_raw",
    ISSUE_RECEIVED_TIME: "field_2020",
    WORKSITE_ARRIVE: "field_1437",
    WORKSITE_LEAVE: "field_1438",
    WORKSITE_SHOP_RETURN: "field_1425",
  },
  WORK_SPECIFICATIONS: {
    PROBLEM_FOUND: "field_1351",
    TASK_ORDERS: "field_2634",
    ACTION_TAKEN: "field_1352",
    CHECKED_ALL: "field_1839",
    FOLLOW_UP_NEEDED: "field_1354",
    FOLLOW_UP_DESCRIPTION: "field_1598",
    SUBMIT_WORK_TICKET: "field_1353",
  },
};

export const ASSET_TYPE_OPTIONS = [
  "Signal",
  "School Beacon",
  "Hazard Flasher",
  "Digital Messaging Sign (DMS)",
  "Camera",
  "Sensor",
  "Other / No Asset",
];

export const ASSET_TYPE_TO_STATE = {
  Signal: "signal",
  "School Beacon": "schoolBeacon",
  "Hazard Flasher": "hazardFlasher",
  "Digital Messaging Sign (DMS)": "dms",
  Camera: "camera",
  Sensor: "sensor",
};

export const YES_NO_OPTIONS = ["Yes", "No"];

export const REPORTED_BY_OPTIONS = [
  "Austin Transportation Staff",
  "311 Customer Service Request (CSR)",
  "TMC",
  "Other",
];

export const WORK_TYPE_TROUBLE_CALL_OPTIONS = [
  "LED Out",
  "Communication Failure",
  "Detection Failure",
  "Digtess",
  "Knockdown",
  "Push Button Not Working",
  "Signal Out or on Flash",
  "Timing Issue",
  "Visibility Issue",
  "Other",
];

export const WORK_TYPE_SCHEDULED_WORK_OPTIONS = [
  "Call-Back (Test Monitors and Cabinets)",
  "On-Call Person (OCP)",
  "Detection - Loop Tie-Ins and Research",
  "Detection - Other",
  "Installation - Install Heads",
  "Installation - APS",
  "Installation - Build Signal Heads",
  "Installation - Cabinet",
  "Installation - Cable",
  "Installation - Camera",
  "Installation - Detection - Video",
  "Installation - Fiber",
  "Installation - Louvers",
  "Installation - Other",
  "Installation - Ped Countdown Inserts",
  "Installation - Poles and/or Arms",
  "Installation - Sensor",
  "Preventative Maintenance",
  "Record APS Audio",
  "Misc - School Zone Transfer",
  "Misc - Test Cabinets",
  "Misc - Traffic Count",
  "Misc - Training",
  "Misc - Turn On Signal",
  "Misc - Assist TxDOT",
  "Pole Removal",
  "Repair - Fiber",
  "Repair - CCTV Camera",
  "Repair - Detection - Loop",
  "Repair - Detection - Video",
  "Repair - Preemption",
  "Repair - UPS Issues (Batteries)",
  "Knockdown Follow-Up",
];

export const INVENTORY_ITEMS_CONDITION_OPTIONS = ["New", "Used"];
