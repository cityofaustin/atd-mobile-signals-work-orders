import {
  faClock,
  faFlagCheckered,
  faCheckCircle,
  faTimes,
  faTruck,
  faExclamationTriangle,
  faBullhorn,
  faAsterisk,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

import { colors } from "./colors";

export const signalsWorkOrderStatuses = {
  Unassigned: {
    icon: faAsterisk,
    backgroundColor: colors.red,
    textColor: colors.white,
  },
  Assigned: {
    icon: faBullhorn,
    backgroundColor: colors.blue,
    textColor: colors.white,
  },
  "In Progress": {
    icon: faWrench,
    backgroundColor: colors.grey,
    textColor: colors.black,
  },
  Submitted: {
    icon: faFlagCheckered,
    backgroundColor: colors.green,
    textColor: colors.white,
  },
  Closed: {
    icon: faCheckCircle,
    textColor: colors.black,
  },
};

export const workOrderInventoryStatuses = {
  Submitted: {
    backgroundColor: colors.inventoryStatusSubmitted,
    textColor: colors.white,
  },
  Issued: {
    backgroundColor: colors.inventoryStatusIssued,
    textColor: colors.white,
  },
  Returned: {
    backgroundColor: colors.inventoryStatusReturned,
    textColor: colors.white,
  },
};

export const statusMap = {
  "ON HOLD": {
    icon: faClock,
    backgroundColor: colors.grey,
    textColor: colors.white,
  },
  "FINAL REVIEW": {
    icon: faFlagCheckered,
    backgroundColor: colors.green,
    textColor: colors.white,
  },
  "NEED TO BE ISSUED": {
    icon: faExclamationTriangle,
    backgroundColor: colors.red,
    textColor: colors.white,
  },
  ISSUED: {
    icon: faTruck,
    backgroundColor: colors.blue,
    textColor: colors.white,
  },
  CLOSED: {
    icon: faCheckCircle,
    backgroundColor: colors.white,
    textColor: colors.black,
  },
  CANCELLED: {
    icon: faTimes,
    backgroundColor: colors.white,
    textColor: colors.black,
  },
};
