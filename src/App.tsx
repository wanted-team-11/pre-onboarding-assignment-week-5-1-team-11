import * as S from "./styles/SearchStyle";

function App() {
  return (
    <S.Container>
      <S.SearchBox>
        <S.SearchTitle>국내 임상시험 검색하고</S.SearchTitle>
        <S.SearchTitle>온라인으로 참여하기</S.SearchTitle>
        <S.SearchInputBox>
          <S.SearchIcon />
          <S.SearchInput type="text" />
          <S.SearchButton type="button">검색</S.SearchButton>
        </S.SearchInputBox>
        <S.SearchResultBox>
          <S.RecommendResult>추천 검색어</S.RecommendResult>
          <S.SearchResult>
            <S.SearchIcon />
            <S.SearchText>검색</S.SearchText>
          </S.SearchResult>
        </S.SearchResultBox>
      </S.SearchBox>
    </S.Container>
  );
}

export default App;
