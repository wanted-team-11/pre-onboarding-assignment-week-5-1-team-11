import { Fragment } from "react";
import styled from "styled-components";

interface HighlightedTextProps {
  children: string;
  keyword: string;
}

const HighlightedText = ({ children, keyword }: HighlightedTextProps) => {
  const highlightText = (text: string, keyword: string) => {
    const splitted = text.split(keyword);
    return splitted.map((word, idx, arr) => (
      <Fragment key={idx}>
        {idx < arr.length - 1 ? (
          <>
            {word}
            <strong>{keyword}</strong>
          </>
        ) : (
          <>{word}</>
        )}
      </Fragment>
    ));
  };

  return <Text>{highlightText(children, keyword)}</Text>;
};

export default HighlightedText;

const Text = styled.span`
  color: black;
  display: inline-block;
  width: 390px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  & > strong {
    font-weight: bold;
  }
`;
