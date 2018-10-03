import React, { Component } from "react";
import KnackScript from "./KnackScript";

class Data extends Component {
  render() {
    const {
      knackUserToken,
      knackDataLoaded,
      knackData,
      requestKnackViewData,
      setKnackUserToken,
      sceneKey,
      viewKey
    } = this.props;

    const hasDataBeenRequested = knackUserToken && !knackDataLoaded;

    return (
      <div>
        {!knackUserToken && (
          <KnackScript
            requestKnackViewData={requestKnackViewData}
            setKnackUserToken={setKnackUserToken}
          />
        )}

        {knackUserToken && (
          <span>👤 User Token Active. Requesting Data...</span>
        )}

        {hasDataBeenRequested && requestKnackViewData("scene_709", "view_1877")}

        {knackDataLoaded && (
          <div>
            <h3>Data 🎉</h3>
            <code>{JSON.stringify(knackData)}</code>
          </div>
        )}
      </div>
    );
  }
}

export default Data;
