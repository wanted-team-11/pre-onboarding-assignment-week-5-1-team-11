import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import HighlightingSearch from "./HighlightingSearch";

export default function SeachList({
  sickNm,
  keyword,
}: {
  sickNm: string;
  keyword: string;
}) {
  return (
    <SearchContainer>
      <AiOutlineSearch />
      <SearchList>{HighlightingSearch(sickNm, keyword)}</SearchList>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchList = styled.div`
  width: 500px;
  margin-left: 10px;
  line-height: 40px;
  font-size: 18px;
`;
