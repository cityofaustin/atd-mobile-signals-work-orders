import React from "react";
import changeCase from "change-case";

const AssetDetailsSection = ({ data, sectionName, fields }) => {
  const sectionDetails = data;
  const sectionFields = fields[sectionName];
  const assetDetailsSectionTitle = changeCase.titleCase(sectionName);
  const firstColumnLength = Math.ceil(sectionFields.length / 2);

  return (
    <div>
      <h4>{assetDetailsSectionTitle}</h4>
      <div className="row">
        <div className="col-6">
          {sectionFields.map((field, i) => {
            console.log(firstColumnLength);
            const fieldId = Object.values(field)[0];
            if (i < firstColumnLength) {
              return (
                <dl>
                  <dt>{changeCase.titleCase(Object.keys(field))}</dt>
                  <dd
                    dangerouslySetInnerHTML={{
                      __html: sectionDetails[fieldId],
                    }}
                  />
                </dl>
              );
            }
          })}
        </div>
        <div className="col-6">
          {sectionFields.map((field, i) => {
            const fieldId = Object.values(field)[0];
            if (i >= firstColumnLength) {
              return (
                <dl>
                  <dt>{changeCase.titleCase(Object.keys(field))}</dt>
                  <dd
                    dangerouslySetInnerHTML={{
                      __html: sectionDetails[fieldId],
                    }}
                  />
                </dl>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsSection;
