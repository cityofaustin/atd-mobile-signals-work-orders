// TODO: Refactor this file and more field ids over to "formConfig.js"

export const workOrderFields = {
  baseFields: {
    modified: "field_1074",
    status: "field_459",
    location: "field_904",
    locationAll: "field_211_raw",
    leadTechnicianRaw: "field_1754_raw",
  },
  details: [
    { "Problem Reported": "field_976" },
    { "Lead Technician": "field_1754" },
    { "Asset Type": "field_977" },
    { "Created By": "field_458" },
    { "Created Date": "field_849" },
    { "Modified By": "field_1421" },
    { "Modified Date": "field_1074" },
    { Status: "field_459" },
    { "Work Order ID": "field_1209" },
    { "Reported By": "field_968" },
    { "Technicians Logged": "field_1753" },
    { "Vehicles Logged": "field_1427" },
  ],
  header: "field_211_raw",
  id: "id",
  assetIdFromDetails: "field_199",
  inventory: {
    INVENTORY_ITEM: "field_513",
    STATUS: "field_1416",
    QUANTITY: "field_524",
    CONDITION: "field_1071",
  },
  images: {
    IMAGE: "field_1047",
    DATESTAMP: "field_1046",
  },
};

export const userFields = {
  info: {
    role: "profile_keys",
    email: "field_168_raw", // contains object with email key
    name: "field_167_raw", // contains object with first and last keys
  },
};
