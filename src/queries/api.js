import axios from "axios";
import Cookies from "js-cookie";

const keys = {
  allMyWorkOrder: { sceneId: "scene_88", viewId: "view_813" },
  workOrderTitle: { sceneId: "scene_297", viewId: "view_910" },
  workOrderDetails: { sceneId: "scene_297", viewId: "view_961" },
  workOrderTimeLogs: { sceneId: "scene_297", viewId: "view_1251" }
};

// Technician options
// https://us-api.knack.com/v1/scenes/scene_297/views/view_1252/connections/field_1753?rows_per_page=2000&filters=%5B%7B%22value%22%3A%22profile_65%22%2C%22operator%22%3A%22contains%22%2C%22field%22%3A%22field_171%22%7D%5D&limit_return=true&_=1538621967582

// Vehicle options
// `https://us-api.knack.com/v1/scenes/scene_297/views/view_1252/connections/field_1427?rows_per_page=2000&filters=%5B%7B%22field%22%3A%22field_2360%22%2C%22operator%22%3A%22is%22%2C%22value%22%3A%22ARTERIAL+MANAGEMENT%22%7D%5D&limit_return=true&_=1538621967585`,

const api = {
  myWorkOrders() {
    return {
      getAll: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.allMyWorkOrder.sceneId
          }/views/${keys.allMyWorkOrder.viewId}/records/`,
          headers
        )
    };
  },
  workOrder() {
    return {
      getTitle: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderTitle.sceneId
          }/views/${keys.workOrderTitle.viewId}/records/${id}`,
          headers
        ),
      getDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderDetails.sceneId
          }/views/${keys.workOrderDetails.viewId}/records/${id}`,
          headers
        ),
      getTimeLogs: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderTimeLogs.sceneId
          }/views/${
            keys.workOrderTimeLogs.viewId
          }/records?format=both&page=1&rows_per_page=25&my-work-order-details2_id=5bb3b798b7748a2d06a4e87b`,
          headers
        ),
      test: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/scene_297/views/view_1251/records?format=both&page=1&rows_per_page=25&my-work-order-details2_id=5bb3b798b7748a2d06a4e87b`,
          headers
        )
    };
  }
};

const headers = {
  headers: {
    "X-Knack-Application-Id": "5b633d68c04cc40730078ac3",
    "X-Knack-REST-API-KEY": "knack",
    Authorization: Cookies.get("knackUserToken"),
    "content-type": "application/json"
  }
};

export default api;
