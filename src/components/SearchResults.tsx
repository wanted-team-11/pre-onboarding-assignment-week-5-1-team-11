import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ISearchList, ISearchValue } from "../types/data.type";
import { useSelector } from "react-redux";
import HighlightText from "./HighlightText";

interface ResultsProps {
  searchLists: ISearchList[];
  listCounter: number;
  listRef: React.MutableRefObject<HTMLUListElement | null>;
}

const SearchResults = ({ searchLists, listCounter, listRef }: ResultsProps) => {
  const searchValue = useSelector((state: ISearchValue) => state.search.value);

  const filteredData = searchLists.filter((item) =>
    item.sickNm.includes(searchValue)
  );

  return (
    <ResultsWrapper>
      <RecommandTitle>추천 검색어</RecommandTitle>
      <ResultsContainer ref={listRef}>
        {filteredData.length === 0 && <NoResults>검색어 없음</NoResults>}
        {filteredData.map((el, i) => (
          <Result key={i} isFocus={i === listCounter ? true : false}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <HighlightText sickNm={el.sickNm} searchValue={searchValue} />
          </Result>
        ))}
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default SearchResults;

const ResultsWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  padding: 15px 20px;
  width: 500px;
  height: 300px;
  background-color: #fff;
  position: sticky;
  top: 0;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const RecommandTitle = styled.div`
  font-size: 14px;
  height: 25px;
  background-color: white;
  color: lightgray;
`;

const ResultsContainer = styled.ul`
  width: auto;
  height: 280px;
  padding-bottom: 35px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Result = styled.li<{ isFocus: boolean }>`
  & + & {
    margin-top: 10px;
  }
  svg {
    margin-right: 10px;
  }
  strong {
    font-weight: bolder;
    color: #3479e1;
  }
  background-color: ${({ isFocus }) =>
    isFocus ? "rgba(52, 121, 225, 0.2)" : null};
  transition: background 0.2s ease;

  &:hover {
    background-color: rgba(52, 121, 225, 0.2);
  }
`;

const NoResults = styled.div`
  width: 120px;
  margin: 100px auto;
  font-size: 24px;
  color: gray;
`;
