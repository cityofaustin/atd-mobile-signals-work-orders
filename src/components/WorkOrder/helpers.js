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

export function getSignalsOptions(searchValue, userPosition) {
  // return api
  //   .workOrder()
  //   .signals(searchValue)
  //   .then(res => res.data.records);
  return axios
    .get(
      `https://data.austintexas.gov/resource/xwqn-2f78.json?$where=within_circle(location,${
        userPosition.lat
      },${userPosition.lon},2000)`
    )
    .then(res => {
      console.log(res);
      // TODO move API call to api.js, sort by distance? decide on a distance parameter for API call
      return res.data.map(beacon => ({
        id: beacon.id,
        identifier: beacon.location_name,
      }));
    });
}

export function getCameraOptions(searchValue) {
  return api
    .workOrder()
    .cameras(searchValue)
    .then(res => res.data.records);
}

export function getSchoolBeaconOptions(userPosition) {
  return api
    .workOrder()
    .schoolZones()
    .then(res => res.data.records);
}

export function getHazardFlasherOptions() {
  return api
    .workOrder()
    .hazardFlashers()
    .then(res => res.data.records);
}

export function getDmsOptions() {
  return api
    .workOrder()
    .dmses()
    .then(res => res.data.records);
}

export function getSensorOptions() {
  return api
    .workOrder()
    .sensors()
    .then(res => res.data.records);
}

export async function getAllAssets(userPosition) {
  const schoolBeaconOptions = await getSchoolBeaconOptions();
  const signalOptions = await getSignalsOptions("", userPosition);
  const cameraOptions = await getCameraOptions("");
  const hazardFlasherOptions = await getHazardFlasherOptions();
  const dmsOptions = await getDmsOptions();
  const sensorOptions = await getSensorOptions();

  return {
    schoolBeaconOptions,
    signalOptions,
    cameraOptions,
    hazardFlasherOptions,
    dmsOptions,
    sensorOptions,
  };
}
