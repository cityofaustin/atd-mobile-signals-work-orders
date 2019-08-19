import api from "../../queries/api";
import axios from "axios";

export function getWorkOrderDetails(id) {
  return api
    .workOrder()
    .getDetails(id)
    .then(res => res.data);
}

export function getWorkOrderTitle(id) {
  return api
    .workOrder()
    .getTitle(id)
    .then(res => res.data);
}

export async function getWorkOrderDetailsAndTitle(id) {
  const details = await getWorkOrderDetails(id);
  const title = await getWorkOrderTitle(id);

  return Object.assign({}, details, title);
}

export async function getWorkOrderDetailAndTimeLogs(id) {
  const details = await getWorkOrderDetails(id);
  const timelogs = await getTimeLogs(id);

  // The following section does data munging. It takes in the
  // timelog results from the Knack API and returns a deduped list
  // of identifiers as a comma separated string.
  //
  // These strings get assigned to field id numbers and merged into
  // the Work Order details return object.
  let techs = "";
  let techniciansSet = new Set();
  let vehicles = "";
  let vehicleSet = new Set();

  timelogs.forEach(timelog => {
    const techniciansForLogs = timelog.field_1753_raw;
    const vehiclesForLogs = timelog.field_1427_raw;

    techniciansForLogs &&
      techniciansForLogs.forEach(technician => {
        techniciansSet.add(technician.identifier);
      });

    vehiclesForLogs &&
      vehiclesForLogs.forEach(vehicle => {
        vehicleSet.add(vehicle.identifier);
      });
  });

  techs =
    techniciansSet.size > 0
      ? Array.from(techniciansSet).join(", ")
      : "No Technicians Logged";
  vehicles =
    vehicleSet.size > 0
      ? Array.from(vehicleSet).join(", ")
      : "No Vehicles Logged";

  return Object.assign({}, details, {
    field_1753: techs,
    field_1427: vehicles,
  });
}

export function getTimeLogs(id) {
  return api
    .workOrder()
    .getTimeLogs(id)
    .then(res => res.data.records);
}

const formatSocrataResponseToKnackFormat = resArray =>
  resArray.data.map(asset => ({
    id: asset.id,
    identifier: "📍 " + asset.location_name,
  }));

const combineKnackAndSocrataAssetResponses = (
  allAssetsResponse,
  nearbyAssetsResponse
) => [
  ...formatSocrataResponseToKnackFormat(nearbyAssetsResponse),
  ...allAssetsResponse.data.records,
];

const addKnackAssetNameToSocrataIdentifier = (
  allAssetsResponse,
  nearbyAssetsResponse
) => {
  // Socrata records only have Hazard Flasher number, add full name from Knack records
  nearbyAssetsResponse.data.map(nearbyAsset => {
    let identifierMatch = "";
    allAssetsResponse.data.records.map(allAsset => {
      const pattern = `^(${nearbyAsset.atd_flasher_id}:)`;
      if (
        allAsset.identifier.match(pattern) &&
        allAsset.id === nearbyAsset.id
      ) {
        identifierMatch = allAsset.identifier;
        nearbyAsset["location_name"] = identifierMatch;
      }
      return allAsset;
    });
    return nearbyAsset;
  });
};

const addKnackAssetNumberToSocrataIdentifier = (
  allAssetsResponse,
  nearbyAssetsResponse
) => {
  // Socrata records only have Hazard Flasher number, add full name from Knack records
  nearbyAssetsResponse.data.map(nearbyAsset => {
    let identifierMatch = "";
    allAssetsResponse.data.records.map(allAsset => {
      const pattern = nearbyAsset.location_name;
      if (
        allAsset.identifier.match(pattern) &&
        allAsset.id === nearbyAsset.id
      ) {
        identifierMatch = allAsset.identifier;
        nearbyAsset["location_name"] = identifierMatch;
      }
      return allAsset;
    });
    return nearbyAsset;
  });
};

// TODO Decide whether to dedupe all results or not
// If so, dedupe needs to retain nearbyAssets over allAssets
const removeDuplicateAssetRecords = assetsArray =>
  Array.from(new Set(assetsArray.map(asset => asset.id))).map(id => {
    return assetsArray.find(asset => asset.id === id);
  });

export function getSignalsOptions(userPosition) {
  return axios
    .all([api.workOrder().signals(), api.workOrder().signalsNear(userPosition)])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        addKnackAssetNumberToSocrataIdentifier(
          allAssetsResponse,
          nearbyAssetsResponse
        );
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getCameraOptions(userPosition) {
  return axios
    .all([api.workOrder().cameras(), api.workOrder().camerasNear(userPosition)])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        addKnackAssetNumberToSocrataIdentifier(
          allAssetsResponse,
          nearbyAssetsResponse
        );
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getSchoolBeaconOptions(userPosition) {
  return axios
    .all([
      api.workOrder().schoolZones(),
      api.workOrder().schoolZonesNear(userPosition),
    ])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        // Form expects School Zone and Socrata returns school zone beacons
        // Find first School Zone match from Socrata and add Knack ID and identifier to record
        // Then remove duplicates
        nearbyAssetsResponse.data.forEach(nearbyAsset => {
          const firstMatch = allAssetsResponse.data.records.find(
            allAsset => allAsset.identifier === nearbyAsset.zone_name
          );
          nearbyAsset["id"] = firstMatch.id;
          nearbyAsset["location_name"] = firstMatch.identifier;
        });
        nearbyAssetsResponse.data = removeDuplicateAssetRecords(
          nearbyAssetsResponse.data
        );
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getHazardFlasherOptions(userPosition) {
  return axios
    .all([
      api.workOrder().hazardFlashers(),
      api.workOrder().hazardFlashersNear(userPosition),
    ])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        addKnackAssetNameToSocrataIdentifier(
          allAssetsResponse,
          nearbyAssetsResponse
        );
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getDmsOptions(userPosition) {
  // DMS SODA table does not have a location column for withinCircle() for the code below to work
  // return axios
  //   .all([api.workOrder().dmses(), api.workOrder().dmsesNear(userPosition)])
  //   .then(
  //     axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
  //       return combineKnackAndSocrataAssetResponses(
  //         allAssetsResponse,
  //         nearbyAssetsResponse
  //       );
  //     })
  //   );
  return api
    .workOrder()
    .dmses()
    .then(res => res.data.records);
}

export function getSensorOptions(userPosition) {
  return axios
    .all([api.workOrder().sensors(), api.workOrder().sensorsNear(userPosition)])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getMyWorkOrders() {
  return api
    .myWorkOrders()
    .getAll()
    .then(res => res.data);
}

export function searchMyWorkOrders(searchValue, pageNumber) {
  return api
    .myWorkOrders()
    .search(searchValue, pageNumber)
    .then(res => res.data);
}

export function getAllWorkOrders() {
  return api
    .allWorkOrders()
    .getAll()
    .then(res => res.data);
}

export function searchAllWorkOrders(searchValue, pageNumber) {
  return api
    .allWorkOrders()
    .searchAll(searchValue, pageNumber)
    .then(res => res.data);
}

export const getAssetsByType = (type, userPosition) => {
  const typeNameToFunctionName = {
    Signal: getSignalsOptions,
    "School Beacon": getSchoolBeaconOptions,
    "Hazard Flasher": getHazardFlasherOptions,
    "Digital Messaging Sign (DMS)": getDmsOptions,
    Camera: getCameraOptions,
    Sensor: getSensorOptions,
  };
  // Call API function based on asset type
  return typeNameToFunctionName[type](userPosition);
};
