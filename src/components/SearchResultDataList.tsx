import styled from "styled-components";
import GetFetchType from "../types/getFetchType";
import HighlightText from "./HighlightText";

interface SearchResultDataListProps {
  liTagIndex: number;
  sickListKeyBoardMoveRef: React.RefObject<HTMLUListElement>;
  sickListVisible: boolean;
  debouncedSearchInputValue: string;
  fetchedSickList: GetFetchType[];
}

const SearchResultDataList = ({
  liTagIndex,
  sickListKeyBoardMoveRef,
  sickListVisible,
  debouncedSearchInputValue,
  fetchedSickList,
}: SearchResultDataListProps) => {
  if (!sickListVisible) return null;

  if (debouncedSearchInputValue.length === 0)
    return (
      <ListContainer>
        <span>검색어 없음</span>
      </ListContainer>
    );

  return (
    <ListContainer ref={sickListKeyBoardMoveRef}>
      {fetchedSickList.map((sickItem, index) => (
        <ContainerElement
          key={sickItem.sickCd}
          isFocus={index === liTagIndex ? true : false}
        >
          <HighlightText
            keyword={debouncedSearchInputValue}
            sickNm={sickItem.sickNm}
          />
        </ContainerElement>
      ))}
    </ListContainer>
  );
};

export default SearchResultDataList;

const ContainerElement = styled.li<{ isFocus: boolean }>`
  margin: 7px 0;
  background-color: ${(props) => (props.isFocus ? "#f0f0f0" : "none")};
  :hover {
    background-color: #f0f0f0;
  }
  strong {
    font-weight: bold;
  }
`;

const ListContainer = styled.ul`
  width: 440px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
`;
