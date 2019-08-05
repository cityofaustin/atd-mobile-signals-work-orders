import React from "react";
import ReadMoreAndLess from "react-read-more-less";

export function handleTableDataStringLength(tableDataString, i) {
  const stringLengthLimit = 75;
  if (tableDataString.length > stringLengthLimit) {
    return (
      <td>
        <ReadMoreAndLess
          className="read-more-content"
          charLimit={stringLengthLimit}
          readMoreText="Read more"
          readLessText="Read less"
        >
          {tableDataString}
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
}
