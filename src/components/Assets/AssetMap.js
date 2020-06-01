import React from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import { FIELDS } from "./fieldConfig";

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

  // See https://github.com/mariusandra/pigeon-maps/blob/4bb3d4ddf78cf1152da8c6462667e393b2b81790/demo/demo.js#L20
  const provider = (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3));
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  };

  return (
    <div className="container">
      <h3>{data[name]}</h3>
      {locationData && (
        <Map center={coordinates} zoom={16} height={400} provider={provider}>
          <Marker anchor={coordinates} />
        </Map>
      )}
    </div>
  );
};

export default AssetMap;
