import * as S from "./styles/SearchStyle";
import { useState, useEffect } from "react";
import SickDataProps from "./types/SickTypes";
import { getData, submitData } from "./api/api";
import HighlightText from "./HighlightText";

function App() {
  const [sickData, setSickData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [cachingData, setCachingData] = useState([]);

  const setCache = async () => {
    const cacheStorage = await caches.open("data");
    const responsedCache = await cacheStorage.match(
      "http://localhost:4000/sick"
    );
  };

  //** Todo : cacheStorage에 변경사항이 없으면 useEffect를 실행시키지 않는다.
  useEffect(() => {
    getData().then((data) => {
      setSickData(data);
    });
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchData(value);
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitData(searchData).then((data) => setCachingData(data));
    console.log("calling api");
  };

  const filterData = sickData.filter((el: SickDataProps) => {
    return el.sickNm.includes(searchData);
  });

  return (
    <S.Container>
      <S.SearchBox>
        <S.SearchTitle>국내 임상시험 검색하고</S.SearchTitle>
        <S.SearchTitle>온라인으로 참여하기</S.SearchTitle>
        <S.SearchInputBox onSubmit={onSubmitSearch}>
          <S.SearchIcon />
          <S.SearchInput
            onChange={onChangeSearch}
            type="text"
            value={searchData}
          />
          <S.SearchButton type="button">검색</S.SearchButton>
        </S.SearchInputBox>
        <S.SearchResultBox>
          <S.RecommendResult>추천 검색어</S.RecommendResult>
          <S.SearchScroll>
            {searchData.length > 0 ? (
              filterData.map((el: SickDataProps) => {
                return (
                  <S.SearchResult key={el.sickCd}>
                    <S.SearchIcon />

                    <HighlightText sickNm={el.sickNm} searchData={searchData}>
                      {el.sickNm}
                    </HighlightText>
                  </S.SearchResult>
                );
              })
            ) : (
              <S.DataNotExist>검색과 일치하는 결과가 없습니다</S.DataNotExist>
            )}
          </S.SearchScroll>
        </S.SearchResultBox>
      </S.SearchBox>
    </S.Container>
  );
}

export default App;
