import React from "react";
import changeCase from "change-case";
import { handleTableDataStringLength } from "./helpers";

const AssetTable = props => {
  const tableHeaders = props.fields.map(field =>
    changeCase.titleCase(Object.keys(field))
  );
  const fieldIds = props.fields.map(field => {
    return Object.values(field)[0];
  });
  // TODO add responsive font size (or rely on side-scroll?)
  // TODO fix whitespaec text node console warning
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
          {props.data &&
            props.data !== "" &&
            props.data.map((record, i) => (
              <tr key={i}>
                {fieldIds.map((fieldId, i) => {
                  const tableDataString = record[fieldId];
                  return handleTableDataStringLength(tableDataString);
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
