import React from "react";
import styled from "styled-components";

export default function HighlightingSearch(text: string, keyword: string) {
  if (keyword !== "" && text.includes(keyword)) {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));

    return (
      <>
        {parts.map((part: string, index: React.Key) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <Markedtext key={index}>{part}</Markedtext>
          ) : (
            part
          )
        )}
      </>
    );
  }

  return text;
}

const Markedtext = styled.span`
  color: blue;
  font-weight: bold;
`;
