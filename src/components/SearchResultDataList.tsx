import styled from "styled-components";
import GetFetchType from "../types/getFetchType";
import HighlightText from "./HighlightText";

interface SearchResultDataListProps {
  sickListVisible: boolean;
  debouncedSearchInputValue: string;
  fetchedSickList: GetFetchType[];
}

const SearchResultDataList = ({
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
    <ListContainer>
      {fetchedSickList.map((sickItem) => (
        <li key={sickItem.sickCd}>
          <HighlightText
            keyword={debouncedSearchInputValue}
            sickNm={sickItem.sickNm}
          />
        </li>
      ))}
    </ListContainer>
  );
};

export default SearchResultDataList;

const ListContainer = styled.ul`
  width: 440px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
  li {
    margin: 7px 0;
    :hover {
      background-color: #f0f0f0;
    }
    strong {
      font-weight: bold;
    }
  }
`;
