import React from "react";
import api from "../../queries/api";
import axios from "axios";
import changeCase from "change-case";
import ReadMoreAndLess from "react-read-more-less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faEdit,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

export const removeBreakTagsFromString = string =>
  string.replace(/(<br \/>)/gm, "\n");

const isStringAnchorTag = string => {
  try {
    return !!string.match(/^(<a)/gm);
  } catch {
    return null;
  }
};

export const handleTableDataStringLength = (tableDataString, i) => {
  const stringLengthLimit = 75;
  if (
    !isStringAnchorTag(tableDataString) &&
    tableDataString.length > stringLengthLimit
  ) {
    return (
      <td key={i}>
        <ReadMoreAndLess
          className="read-more-content"
          charLimit={stringLengthLimit}
          readMoreText="Read more"
          readLessText="Read less"
        >
          {removeBreakTagsFromString(tableDataString)}
        </ReadMoreAndLess>
      </td>
    );
  } else {
    // Add target parameter to open new tab and prevent losing place in app when following a link
    const contents = isStringAnchorTag(tableDataString)
      ? (tableDataString = tableDataString.replace("<a", `<a target="_blank"`))
      : tableDataString;
    return (
      <td
        key={i}
        dangerouslySetInnerHTML={{
          __html: contents,
        }}
      />
    );
  }
};

export const createDetectorLink = (id, assetId) => (
  <div className="container mt-3 ml-2">
    <a
      className="mt-2"
      href={`https://transportation.austintexas.io/data-tracker/#home/signals/signal-details/${assetId}/detector-details/${id}/`}
    >
      <FontAwesomeIcon icon={faTable} size="2x" />
    </a>
  </div>
);

export const addDetectionLinks = assetId => (
  <div>
    <a
      class="btn btn-primary btn-lg mb-2 mr-2"
      role="button"
      href={`https://transportation.austintexas.io/data-tracker/#home/signals/signal-details/${assetId}/edit-signal-detectors/${assetId}/`}
    >
      <FontAwesomeIcon icon={faEdit} /> {"Edit Detectors"}
    </a>
    <a
      class="btn btn-primary btn-lg mb-2 mr-2"
      role="button"
      href={
        "https://transportation.austintexas.io/data-tracker/#home/detection-reports/detection-qc/"
      }
    >
      <FontAwesomeIcon icon={faCheckSquare} /> {"Detectors QC"}
    </a>
  </div>
);

const uppercaseIdInString = string => string.replace(/(Id)/gm, "ID");

const uppercaseIpInString = string => string.replace(/(Ip)/gm, "IP");

const uppercaseCadInString = string => string.replace(/(Cad)/gm, "CAD");

const uppercaseApsInString = string => string.replace(/(Aps)/gm, "APS");

export const formatDataTitles = dataTitle => {
  let formattedTitle = changeCase.titleCase(dataTitle);
  formattedTitle = uppercaseIdInString(formattedTitle);
  formattedTitle = uppercaseCadInString(formattedTitle);
  formattedTitle = uppercaseApsInString(formattedTitle);
  return uppercaseIpInString(formattedTitle);
};

export const getAllFirstHalfAssetDetails = item => {
  return axios
    .all([
      api.assets().map(item.id),
      api.assets().details(item.id),
      api.assets().cameras(item.id),
      api.assets().serviceRequests(item.id),
      api.assets().workOrders(item.id),
      api.assets().preventativeMaint(item.id),
      api.assets().fileAttachments(item.id),
    ])
    .then(
      axios.spread(
        (
          mapResponse,
          detailsResponse,
          camerasResponse,
          serviceRequestsResponse,
          workOrdersResponse,
          preventativeMaintResponse,
          fileAttachmentsResponse
        ) => {
          return {
            mapResponse,
            detailsResponse,
            camerasResponse,
            serviceRequestsResponse,
            workOrdersResponse,
            preventativeMaintResponse,
            fileAttachmentsResponse,
          };
        }
      )
    );
};

export const getAllSecondHalfAssetDetails = item => {
  return axios
    .all([
      api.assets().detectors(item.id),
      api.assets().signalPriority(item.id),
      api.assets().poleAttachments(item.id),
      api.assets().travelSensor(item.id),
      api.assets().apsButtonRequests(item.id),
      api.assets().cadStatus(item.id),
    ])
    .then(
      axios.spread(
        (
          detectorsResponse,
          signalPriorityResponse,
          poleAttachmentsResponse,
          travelSensorResponse,
          apsButtonRequestsResponse,
          cadStatusResponse
        ) => {
          return {
            detectorsResponse,
            signalPriorityResponse,
            poleAttachmentsResponse,
            travelSensorResponse,
            apsButtonRequestsResponse,
            cadStatusResponse,
          };
        }
      )
    );
};
