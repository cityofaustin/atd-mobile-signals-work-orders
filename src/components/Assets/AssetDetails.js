import React from "react";
import changeCase from "change-case";
import { FIELDS } from "./formConfig";

const AssetDetails = props => {
  const details = props.AssetDetails;
  const fields = FIELDS.ASSETS_DETAILS;
  return (
    <div>
      <div className="row">
        <div className="col-6">
          {fields.details.map(field => (
            <div>{changeCase.titleCase(Object.keys(field))}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
