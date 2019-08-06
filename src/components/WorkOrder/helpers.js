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
