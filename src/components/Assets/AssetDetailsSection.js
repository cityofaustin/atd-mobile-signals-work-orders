import React from "react";
import { formatDataTitles } from "./helpers";

const AssetDetailsSection = ({ data, sectionName, fields }) => {
  const sectionDetails = data;
  const sectionFields = fields[sectionName];
  const assetDetailsSectionTitle = formatDataTitles(sectionName);
  const firstColumnLength = Math.ceil(sectionFields.length / 2);

  return (
    <div>
      <h4>{assetDetailsSectionTitle}</h4>
      <div className="row">
        <div className="col-6">
          {sectionFields.map((field, i) => {
            const fieldId = Object.values(field)[0];
            if (i < firstColumnLength) {
              return (
                <dl key={i}>
                  <dt>{formatDataTitles(Object.keys(field))}</dt>
                  <dd
                    dangerouslySetInnerHTML={{
                      __html: sectionDetails[fieldId],
                    }}
                  />
                </dl>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="col-6">
          {sectionFields.map((field, i) => {
            const fieldId = Object.values(field)[0];
            if (i >= firstColumnLength) {
              return (
                <dl key={i}>
                  <dt>{formatDataTitles(Object.keys(field))}</dt>
                  <dd
                    dangerouslySetInnerHTML={{
                      __html: sectionDetails[fieldId],
                    }}
                  />
                </dl>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsSection;
