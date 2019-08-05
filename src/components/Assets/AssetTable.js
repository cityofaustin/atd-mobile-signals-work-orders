import React from "react";
import changeCase from "change-case";

const AssetTable = props => {
  const tableHeaders = props.fields.map(field =>
    changeCase.titleCase(Object.keys(field))
  );
  const fieldIds = props.fields.map(field => {
    return Object.values(field)[0];
  });

  // TODO add "Read more" to Details and add responsive font size
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
            props.data.map(record => (
              <tr>
                {fieldIds.map(fieldId => (
                  <td
                    dangerouslySetInnerHTML={{
                      __html: record[fieldId],
                    }}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
