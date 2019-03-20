export const FIELDS = {
  ASSET_TYPE: "field_977",
  ASSETS: {
    signal: {
      fieldId: "field_1060",
      label: "Signal"
    },
    camera: {
      fieldId: "field_1862",
      label: "Camera"
    },
    schoolBeacon: {
      fieldId: "field_1871",
      label: "School Zone"
    },
    hazardFlasher: {
      fieldId: "field_1864",
      label: "Hazard Flasher"
    },
    dms: {
      fieldId: "field_1859",
      label: "DMS"
    },
    sensor: {
      fieldId: "field_1863",
      label: "Sensor"
    }
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
  LOCATION_NAME_RAW: "field_211_raw",
  WORK_DESCRIPTION: "field_463",
  WORK_TYPE: "field_1004",
  WORK_TYPE_TROUBLE_CALL: "field_976",
  WORK_TYPE_SCHEDULED_WORK: "field_900",
  WORK_TYPE_OTHER: "field_1420",
  WORK_SCHEDULED_DATE: "field_460",
  TASK_ORDERS: "field_2634",
  STATUS: "field_459"
};

export const ASSET_TYPE_OPTIONS = [
  "Signal",
  "Camera",
  "School Beacon",
  "Hazard Flasher",
  "Digital Messaging Sign (DMS)",
  "Sensor",
  "Other / No Asset"
];

export const YES_NO_OPTIONS = ["Yes", "No"];

export const REPORTED_BY_OPTIONS = [
  "Austin Transportation Staff",
  "311 Customer Service Request (CSR)",
  "TMC",
  "Other"
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
  "Other"
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
  "Knockdown Follow-Up"
];
