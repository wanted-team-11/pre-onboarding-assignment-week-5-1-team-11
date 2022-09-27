import styled from "styled-components";

interface HighlightedTextProps {
  children: string;
  keyword: string;
}

const HighlightedText = ({ children, keyword }: HighlightedTextProps) => {
  const highlightText = (text: string, keyword: string) => {
    return text.replaceAll(keyword, `<strong>${keyword}</strong>`);
  };

  return (
    <Text
      dangerouslySetInnerHTML={{ __html: highlightText(children, keyword) }}
    />
  );
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
