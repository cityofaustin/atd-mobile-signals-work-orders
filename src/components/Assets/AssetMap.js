import React from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import { FIELDS } from "./formConfig";

const AssetMap = props => {
  const fields = FIELDS.ASSETS_MAP;
  const { name, location } = fields;
  const data = props.data;
  const locationData = data[location];
  const coordinates = locationData
    ? [
        parseFloat(locationData.latitude, 5),
        parseFloat(locationData.longitude, 5),
      ]
    : null;
  return (
    <div className="container">
      <h3>{data[name]}</h3>
      {locationData && (
        <Map center={coordinates} zoom={16} height={400}>
          <Marker anchor={coordinates} />
        </Map>
      )}
    </div>
  );
};

export default AssetMap;
