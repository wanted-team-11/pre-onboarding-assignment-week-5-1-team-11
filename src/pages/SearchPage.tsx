import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import SearchResultDataList from "../components/SearchResultDataList";
import useDebounce from "../hooks/useDebounce.hook";
import getFetchData from "../services/getFetchData.service";
import GetFetchType from "../types/getFetchType";

const SearchPage = () => {
  const [fetchedSickList, setFetchedSickList] = useState<GetFetchType[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 1000);

  useEffect(() => {
    if (debouncedSearchInputValue) {
      getFetchData<GetFetchType[]>(debouncedSearchInputValue).then((data) => {
        setFetchedSickList([...data]);
      });
    }
  }, [debouncedSearchInputValue]);

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchInputValue(() => value);
  };

  const onSubmitInputValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };
  return (
    <Container>
      <Header />
      <div>
        <SearchBox>
          <SearchForm onSubmit={onSubmitInputValue}>
            <input
              type="search"
              spellCheck={false}
              placeholder={"질환명을 입력하세요."}
              onChange={onChangeInputValue}
            />
            <button type="submit">돋보기</button>
          </SearchForm>
          <SearchResultDataList />
        </SearchBox>
      </div>
    </Container>
  );
};
export default SearchPage;

const SearchForm = styled.form``;
const SearchBox = styled.div``;

const Header = styled.header`
  background-color: white;
  height: 50px;
  padding: 0 10 0 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #d0e6ff;
`;
