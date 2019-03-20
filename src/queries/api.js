import axios from "axios";
import Cookies from "js-cookie";
import { APP_ID } from "../constants/api";

const keys = {
  allMyWorkOrders: { sceneId: "scene_88", viewId: "view_813" },
  editWorkOrder: {
    sceneId: "scene_384",
    viewId: "view_1082"
  },
  editNewWorkOrder: {
    sceneId: "scene_328",
    detailsViewId: "view_962",
    formViewId: "view_958",
    assignToSelfId: "field_1752",
    technicianId: "field_1754",
    csrFieldId: "field_1235",
    taskOrderId: "field_2634"
  },
  submitWorkoder: {
    sceneId: "scene_450",
    viewId: "view_1280"
  },
  newWorkOrder: {
    sceneId: "scene_337",
    viewId: "view_1672",
    cameraFieldId: "field_1862",
    schoolZoneFieldId: "field_1871",
    signalFieldId: "field_1060",
    hazardFlasherFieldId: "field_1864",
    dmsFieldId: "field_1859",
    sensorFieldId: "field_1863"
  },
  newCsrNumber: {
    sceneId: "scene_328",
    viewId: "view_1115"
  },
  workOrderDetails: { sceneId: "scene_297", viewId: "view_961" },
  workOrderImages: { sceneId: "scene_297", viewId: "view_922" },
  workOrderInventory: { sceneId: "scene_297", viewId: "view_885" },
  workOrderTimeLogs: { sceneId: "scene_297", viewId: "view_1251" },
  workOrderTitle: { sceneId: "scene_297", viewId: "view_910" }
};

// Vehicle options
// `https://us-api.knack.com/v1/scenes/scene_297/views/view_1252/connections/field_1427?rows_per_page=2000&filters=%5B%7B%22field%22%3A%22field_2360%22%2C%22operator%22%3A%22is%22%2C%22value%22%3A%22ARTERIAL+MANAGEMENT%22%7D%5D&limit_return=true&_=1538621967585`,

// images
// https://us-api.knack.com/v1/scenes/scene_297/views/view_922/records?format=both&page=1&rows_per_page=25&my-work-order-details2_id=5bb3b798b7748a2d06a4e87b&sort_field=field_1044&sort_order=asc&_=1538676399108

const api = {
  csrNumber() {
    return {
      new: data =>
        axios.post(
          `https://us-api.knack.com/v1/scenes/${
            keys.newCsrNumber.sceneId
          }/views/${keys.newCsrNumber.viewId}/records`,
          data,
          getHeaders()
        )
    };
  },
  myWorkOrders() {
    return {
      getAll: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.allMyWorkOrders.sceneId
          }/views/${keys.allMyWorkOrders.viewId}/records/`,
          getHeaders()
        )
    };
  },
  workOrder() {
    return {
      technicians: data =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/connections/${
            keys.editNewWorkOrder.technicianId
          }?rows_per_page=2000&filters=[{"value":"profile_65","operator":"contains","field":"field_171"}]`,
          getHeaders()
        ),
      csr: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/connections/${
            keys.editNewWorkOrder.csrFieldId
          }?rows_per_page=2000&filters=[{"field":"field_1887","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      taskOrder: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/connections/${
            keys.editNewWorkOrder.taskOrderId
          }?rows_per_page=2000&filters=[{"field":"field_2633","operator":"is","value":"Yes"},{"field":"field_1278","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      new: data =>
        axios.post(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/records`,
          data,
          getHeaders()
        ),
      edit: (id, data) =>
        axios.put(
          `https://us-api.knack.com/v1/scenes/${
            keys.editWorkOrder.sceneId
          }/views/${keys.editWorkOrder.viewId}/records/${id}`,
          data,
          getHeaders()
        ),
      getEditPageDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editWorkOrder.sceneId
          }/views/${keys.editWorkOrder.viewId}/records/${id}`,
          getHeaders()
        ),
      submit: (id, data) =>
        axios.put(
          `https://us-api.knack.com/v1/scenes/${
            keys.submitWorkoder.sceneId
          }/views/${keys.submitWorkoder.viewId}/records/${id}`,
          data,
          getHeaders()
        ),
      editNewWorkOrder: (id, data) =>
        axios.put(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/records/${id}`,
          data,
          getHeaders()
        ),
      getEditNewWorkOrderDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.detailsViewId}/records/${id}`,
          getHeaders()
        ),
      getTitle: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderTitle.sceneId
          }/views/${keys.workOrderTitle.viewId}/records/${id}`,
          getHeaders()
        ),
      getDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderDetails.sceneId
          }/views/${keys.workOrderDetails.viewId}/records/${id}`,
          getHeaders()
        ),
      getTimeLogs: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderTimeLogs.sceneId
          }/views/${
            keys.workOrderTimeLogs.viewId
          }/records?my-work-order-details2_id=${id}`,
          getHeaders()
        ),
      getInventory: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderInventory.sceneId
          }/views/${
            keys.workOrderInventory.viewId
          }/records?my-work-order-details2_id=${id}`,
          getHeaders()
        ),
      getImages: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderImages.sceneId
          }/views/${
            keys.workOrderImages.viewId
          }/records?my-work-order-details2_id=${id}`,
          getHeaders()
        ),
      schoolZones: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.schoolZoneFieldId
          }?rows_per_page=2000`,
          getHeaders()
        ),
      signals: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.signalFieldId
          }?rows_per_page=2000&filters=[{"value":"PRIMARY","operator":"is","field":"field_208"},{"field":"field_1058","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      cameras: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.cameraFieldId
          }?rows_per_page=2000&filters=[{"field":"field_1514","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      hazardFlashers: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.hazardFlasherFieldId
          }?rows_per_page=2000&filters=[]&limit_return=true`,
          getHeaders()
        ),
      dmses: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.dmsFieldId
          }?rows_per_page=2000&filters=[]&limit_return=true`,
          getHeaders()
        ),
      sensors: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.sensorFieldId
          }?rows_per_page=2000&filters=[]&limit_return=true`,
          getHeaders()
        )
    };
  }
};

function getHeaders() {
  return {
    headers: {
      "X-Knack-Application-Id": APP_ID,
      "X-Knack-REST-API-KEY": "knack",
      Authorization: Cookies.get("knackUserToken"),
      "content-type": "application/json"
    }
  };
}

export default api;
