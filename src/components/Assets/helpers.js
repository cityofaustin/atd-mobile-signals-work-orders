import React from "react";
import api from "../../queries/api";
import axios from "axios";
import changeCase from "change-case";
import ReadMoreAndLess from "react-read-more-less";

const removeBreakTagsFromString = string => string.replace(/(<br \/>)/gm, " ");

const isStringAnchorTag = string => {
  try {
    return !!string.match(/^(<a href)/gm);
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
    return (
      <td
        key={i}
        dangerouslySetInnerHTML={{
          __html: tableDataString,
        }}
      />
    );
  }
};

const uppercaseIdInString = string => string.replace(/(Id)/gm, "ID");

const uppercaseIpInString = string => string.replace(/(Ip)/gm, "IP");

const uppercaseCadInString = string => string.replace(/(Cad)/gm, "CAD");

export const formatDataTitles = dataTitle => {
  let formattedTitle = changeCase.titleCase(dataTitle);
  formattedTitle = uppercaseIdInString(formattedTitle);
  formattedTitle = uppercaseCadInString(formattedTitle);
  return uppercaseIpInString(formattedTitle);
};

export const getAllAssetDetails = item => {
  return axios
    .all([
      api.assets().workOrders(item.id),
      api.assets().serviceRequests(item.id),
      api.assets().details(item.id),
      api.assets().cameras(item.id),
      api.assets().preventativeMaint(item.id),
      api.assets().map(item.id),
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
          workOrdersResponse,
          serviceRequestsResponse,
          detailsResponse,
          camerasResponse,
          preventativeMaintResponse,
          mapResponse,
          detectorsResponse,
          signalPriorityResponse,
          poleAttachmentsResponse,
          travelSensorResponse,
          apsButtonRequestsResponse,
          cadStatusResponse
        ) => {
          return {
            workOrdersResponse,
            serviceRequestsResponse,
            detailsResponse,
            camerasResponse,
            preventativeMaintResponse,
            mapResponse,
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
