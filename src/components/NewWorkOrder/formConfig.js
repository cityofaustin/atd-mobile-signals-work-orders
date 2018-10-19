export const FIELDS = {
  ASSET_TYPE: "field_977",
  ASSETS: {
    Signal: {
      fieldId: "field_1060",
      label: "Signal",
      options: [
        {
          id: "hi",
          name: "hi"
        },
        { id: "ho", name: "ho" }
      ]
    },
    Camera: {
      fieldId: "field_1862",
      label: "Camera"
    },
    "School Beacon": {
      fieldId: "field_1871",
      label: "School Zone"
    },
    "Hazard Flasher": {
      fieldId: "field_1864",
      label: "Hazard Flasher",
      options: [] // TODO
    },
    "Digital Messaging Sign (DMS)": {
      fieldId: "field_1859",
      label: "DMS",
      options: [] // TODO
    },
    Sensor: {
      fieldId: "field_1863",
      label: "Sensor",
      options: [] // TODO
    }
  },
  WORK_TYPE: "field_1004",
  WORK_TYPE_TROUBLE_CALL: "field_976",
  WORK_TYPE_SCHEDULED_WORK: "field_900",
  WORK_TYPE_OTHER: "field_1420"
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
