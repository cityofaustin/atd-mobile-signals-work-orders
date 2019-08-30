import React from "react";
import {
  handleTableDataStringLength,
  formatDataTitles,
  createDetectorLink,
  addDetectionLinks,
} from "./helpers";

const AssetTable = ({ fields, data, assetId, title, workOrderId }) => {
  const tableHeaders = fields.map(field =>
    formatDataTitles(Object.keys(field))
  );
  const fieldIds = fields.map(field => {
    return Object.values(field)[0];
  });

  // TODO fix whitespace text node console warning
  // TODO handle URLs returned from Knack - make URLs set state to change current asset?
  return (
    <div className="table-responsive">
      {workOrderId &&
        title === "Detection" &&
        addDetectionLinks(assetId, workOrderId)}
      <table className="table">
        <thead>
          <tr>
            {tableHeaders.map((header, i) => (
              <th key={i} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data !== "" &&
            data.map((record, i) => (
              <tr key={i}>
                {fieldIds.map((fieldId, i) => {
                  if (fieldId.match(/(-detector-link)/)) {
                    const fieldIdWithoutFlag = fieldId.replace(
                      "-detector-link",
                      ""
                    );
                    const id = record[fieldIdWithoutFlag];
                    return createDetectorLink(id, assetId);
                  } else {
                    const tableDataString = record[fieldId];
                    return handleTableDataStringLength(tableDataString, i);
                  }
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
