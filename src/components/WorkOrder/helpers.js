import api from "../../queries/api";

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

  return Object.assign({}, details, { field_1753: timelogs });
}

export function getTimeLogs(id) {
  return api
    .workOrder()
    .getTimeLogs(id)
    .then(res => res.data.records);
}

export function getSignalsOptions(searchValue) {
  return api
    .workOrder()
    .signals(searchValue)
    .then(res => res.data.records);
}

export function getCameraOptions(searchValue) {
  return api
    .workOrder()
    .cameras(searchValue)
    .then(res => res.data.records);
}

export function getSchoolBeaconOptions() {
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

export async function getAllAssets() {
  const schoolBeaconOptions = await getSchoolBeaconOptions();
  const signalOptions = await getSignalsOptions("");
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
