// TODO: Refactor this file and more field ids over to "formConfig.js"

export const workOrderFields = {
  baseFields: {
    modified: "field_1074",
    status: "field_459",
    location: "field_904"
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
    { "Reported By": "field_968" }
  ],
  header: "field_211_raw",
  inventory: {
    INVENTORY_ITEM: "field_513",
    STATUS: "field_1416",
    QUANTITY: "field_524",
    CONDITION: "field_1071"
  },
  images: {
    IMAGE: "field_1047",
    DATESTAMP: "field_1046"
  }
};
