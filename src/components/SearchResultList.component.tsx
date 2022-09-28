import type { Sick } from "../types";
import styled from "styled-components";
import { ReactComponent as SearchSVG } from "../assets/SearchIcon.svg";
import Highlight from "./HighlightedText.component";

interface SearchResultListProps {
  sickList: Sick[];
  keyword: string;
  focused: number;
}

const SearchResultList = ({
  sickList,
  keyword,
  focused,
}: SearchResultListProps) => {
  return (
    <ResultsContainer>
      {sickList.length > 0 ? (
        <>
          <span>추천 검색어</span>
          {sickList.length > 0 &&
            sickList.map((sick, index) => (
              <Result key={sick.sickCd} isFocused={index === focused}>
                <SearchIcon />
                <Highlight keyword={keyword}>{sick.sickNm}</Highlight>
              </Result>
            ))}
        </>
      ) : (
        <span>검색어 없음</span>
      )}
    </ResultsContainer>
  );
};

export default SearchResultList;

const ResultsContainer = styled.ul`
  position: absolute;
  left: 50%;
  top: 90px;
  margin-top: 10px;
  transform: translateX(-50%);
  width: 100%;
  min-height: 10px;
  background-color: white;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0px 0px 11px 4px rgba(0, 0, 0, 0.1);
  & > span {
    color: #6a737b;
  }
`;

const Result = styled.li<{ isFocused: boolean }>`
  padding: 1em 0;
  font-size: 20px;
  background-color: ${(props) => (props.isFocused ? "#e3e3e3" : "white")};
`;

const SearchIcon = styled(SearchSVG)`
  color: #6a737b;
  width: 16px;
  margin-right: 10px;
`;
