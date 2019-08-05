import React from "react";
import ReadMoreAndLess from "react-read-more-less";

const removeBreakTagsFromString = string => string.replace(/(<br \/>)/gm, " ");

const isStringAnchorTag = string => {
  try {
    return !!string.match(/^(<a href)/gm);
  } catch {
    return null;
  }
};

export const handleTableDataStringLength = (tableDataString, i) => {
  const stringLengthLimit = 75;
  if (
    !isStringAnchorTag(tableDataString) &&
    tableDataString.length > stringLengthLimit
  ) {
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
