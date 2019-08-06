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
    timelog.field_1753_raw.forEach(technician => {
      techniciansSet.add(technician.identifier);
    });
    timelog.field_1427_raw.forEach(vehicle => {
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
  resArray.data.map(beacon => ({
    id: beacon.id,
    identifier: "📍 " + beacon.location_name,
  }));

const combineKnackAndSocrataAssetResponses = (
  allAssetsResponse,
  nearbyAssetsResponse
) => [
  ...formatSocrataResponseToKnackFormat(nearbyAssetsResponse),
  ...allAssetsResponse.data.records,
];

export function getSignalsOptions(searchValue, userPosition) {
  return axios
    .all([
      api.workOrder().signals(searchValue),
      api.workOrder().signalsNear(userPosition),
    ])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getCameraOptions(searchValue, userPosition) {
  return axios
    .all([
      api.workOrder().cameras(searchValue),
      api.workOrder().camerasNear(userPosition),
    ])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
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
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
}

export function getDmsOptions(userPosition) {
  return axios
    .all([api.workOrder().dmses(), api.workOrder().dmsesNear(userPosition)])
    .then(
      axios.spread(function(allAssetsResponse, nearbyAssetsResponse) {
        return combineKnackAndSocrataAssetResponses(
          allAssetsResponse,
          nearbyAssetsResponse
        );
      })
    );
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

export async function getAllAssets(userPosition) {
  const schoolBeaconOptions = await getSchoolBeaconOptions(userPosition);
  const signalOptions = await getSignalsOptions("", userPosition);
  const cameraOptions = await getCameraOptions("", userPosition);
  const hazardFlasherOptions = await getHazardFlasherOptions(userPosition);
  const dmsOptions = await getDmsOptions(userPosition);
  const sensorOptions = await getSensorOptions(userPosition);

  return {
    schoolBeaconOptions,
    signalOptions,
    cameraOptions,
    hazardFlasherOptions,
    dmsOptions,
    sensorOptions,
  };
}
