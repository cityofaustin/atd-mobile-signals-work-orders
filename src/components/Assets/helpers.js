import React from "react";
import ReadMoreAndLess from "react-read-more-less";

const removeBreakTagsFromString = string => string.replace(/(<br \/>)/gm, "");

const isStringAnchorTag = string => (string.match(/(<a href)/) ? true : false);

export const handleTableDataStringLength = (tableDataString, i) => {
  const stringLengthLimit = 75;
  if (tableDataString.length > stringLengthLimit && !isStringAnchorTag) {
    return (
      <td>
        <ReadMoreAndLess
          className="read-more-content"
          charLimit={stringLengthLimit}
          readMoreText="Read more"
          readLessText="Read less"
        >
          {removeBreakTagsFromString(tableDataString)}
        </ReadMoreAndLess>
      </td>
    );
  } else {
    return (
      <td
        key={i}
        dangerouslySetInnerHTML={{
          __html: tableDataString,
        }}
      />
    );
  }
};
