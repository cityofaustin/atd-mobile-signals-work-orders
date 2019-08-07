import React from "react";
import { handleTableDataStringLength, formatDataTitles } from "./helpers";

const AssetTable = ({ fields, data }) => {
  const tableHeaders = fields.map(field =>
    formatDataTitles(Object.keys(field))
  );
  const fieldIds = fields.map(field => {
    return Object.values(field)[0];
  });
  // TODO add responsive font size (or rely on side-scroll?)
  // TODO fix whitespace text node console warning
  // TODO handle URLs returned from Knack - make URLs set state to change current asset?
  return (
    <div className="table-responsive">
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
                  const tableDataString = record[fieldId];
                  return handleTableDataStringLength(tableDataString, i);
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
