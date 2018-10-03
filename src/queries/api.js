import axios from "axios";
import Cookies from "js-cookie";

const keys = {
  workOrder: { sceneId: "scene_776", viewId: "view_2037" }
};

const api = {
  workOrder() {
    return {
      getAll: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${keys.workOrder.sceneId}/views/${
            keys.workOrder.viewId
          }/records`,
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
