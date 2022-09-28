import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import SearchList from "../components/SearchList";
import { onSearchApi } from "../services/api";
import useDebounce from "../hooks/useDebounce.hook";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchdatas, setSearchSDatas] = useState([]);
  const debouncedSearchInputValue = useDebounce(search, 100);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchApi(debouncedSearchInputValue).then((data) =>
      setSearchSDatas(data)
    );
  };

  return (
    <MainContainer>
      <SearchTitle>국내 모든 임상시험 검색하고 </SearchTitle>
      <SearchTitle>온라인으로 참여하기</SearchTitle>
      <SerachBox>
        <SeaarchIcon />
        <SearchInput placeholder="검색" value={search} onChange={onChange} />
      </SerachBox>
      {search && searchdatas.length > 0 ? (
        <ResultBox>
          <YesResult>추천 검색어</YesResult>
          {searchdatas.map((searchdata: { sickCd: number; sickNm: string }) => (
            <SearchList
              key={searchdata.sickCd}
              sickNm={searchdata.sickNm}
              keyword={search}
            />
          ))}
        </ResultBox>
      ) : (
        <NoResult>검색어 없음</NoResult>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const SearchTitle = styled.p`
  font-weight: bold;
  font-size: 40px;
  margin-top: 20px;
`;

const SerachBox = styled.div`
  width: 500px;
  height: 40px;
  border-radius: 20px;
  border: solid 4px rgba(3, 192, 250, 0.3);
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin: 50px auto auto;
`;
const SeaarchIcon = styled(AiOutlineSearch)`
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  border: none;
  margin-left: 10px;
  overflow: auto;
  font-size: 20px;
  padding-left: 5px;
  outline: none;
`;

const ResultBox = styled.div`
  margin: 5px auto auto;
  width: 490px;
  border: solid 4px rgba(3, 192, 250, 0.3);
  border-radius: 20px;
  font-size: 20px;
  text-align: start;
  line-height: 30px;
  padding: 10px;
`;

const NoResult = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const YesResult = styled.div`
  font-size: 14px;
  color: gray;
`;
