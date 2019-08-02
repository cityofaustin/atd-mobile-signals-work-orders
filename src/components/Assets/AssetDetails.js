import React from "react";
import changeCase from "change-case";
import { FIELDS } from "./formConfig";

const AssetDetails = props => {
  const details = props.assetDetails;
  const fields = FIELDS.ASSETS_DETAILS;
  return (
    <div>
      <div className="row">
        <div className="col-6">
          {fields.details.map(field => {
            const fieldId = Object.values(field)[0];
            return (
              <dl>
                <dt>{changeCase.titleCase(Object.keys(field))}</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: details[fieldId],
                  }}
                />
              </dl>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
