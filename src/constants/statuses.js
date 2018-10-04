import {
  faClock,
  faFlagCheckered,
  faCheckCircle,
  faTimes,
  faTruck,
  faExclamationTriangle,
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";

export const signalsWorkOrderStatuses = {
  Assigned: {
    icon: faBullhorn,
    backgroundColor: "#377eb8",
    textColor: "white"
  }
};

export const statusMap = {
  "ON HOLD": {
    icon: faClock,
    backgroundColor: "#aeaeae",
    textColor: "white"
  },
  "FINAL REVIEW": {
    icon: faFlagCheckered,
    backgroundColor: "#4daf4a",
    textColor: "white"
  },
  "NEED TO BE ISSUED": {
    icon: faExclamationTriangle,
    backgroundColor: "#e41a1c",
    textColor: "white"
  },
  ISSUED: {
    icon: faTruck,
    backgroundColor: "#377eb8",
    textColor: "white"
  },
  CLOSED: {
    icon: faCheckCircle,
    backgroundColor: "white",
    textColor: "black"
  },
  CANCELLED: {
    icon: faTimes,
    backgroundColor: "white",
    textColor: "black"
  }
};
