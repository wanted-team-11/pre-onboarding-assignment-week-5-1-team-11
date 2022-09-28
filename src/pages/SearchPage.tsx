import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchResultDataList from "../components/SearchResultDataList";
import useDebounce from "../hooks/useDebounce.hook";
import useOnClickOutside from "../hooks/useOnClickOutSide";
import getFetchData from "../services/getFetchData.service";
import GetFetchType from "../types/getFetchType";

const SearchPage = () => {
  const [fetchedSickList, setFetchedSickList] = useState<GetFetchType[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 1000);
  const inputFocusRef = useRef<HTMLInputElement>(null);
  const [sickListVisible, setSickListVisible] = useState<boolean>(false);

  useOnClickOutside(inputFocusRef, () => setSickListVisible(() => false));
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
  const onClickInputTag = () => {
    setSickListVisible(() => true);
  };
  return (
    <PageWrapper>
      <Header />
      <Container>
        <SearchBox>
          <SearchForm onSubmit={onSubmitInputValue}>
            <input
              ref={inputFocusRef}
              type="search"
              spellCheck={false}
              placeholder={"질환명을 입력하세요."}
              onChange={onChangeInputValue}
              onClick={onClickInputTag}
            />
            <button type="submit">돋보기</button>
          </SearchForm>
          <SearchResultDataList
            sickListVisible={sickListVisible}
            debouncedSearchInputValue={debouncedSearchInputValue}
            fetchedSickList={fetchedSickList}
          />
        </SearchBox>
      </Container>
    </PageWrapper>
  );
};
export default SearchPage;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;

  input {
    width: 400px;
    font-size: 16px;
    padding: 10px;
    border: none;
    outline: none;
    :focus {
      ::placeholder {
        visibility: hidden;
      }
    }
  }
  button {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: rgb(0, 123, 233);
    border: none;
    color: white;
    cursor: pointer;
  }
`;
const SearchBox = styled.div`
  width: 460px;
  height: 80px;
  border-radius: 40px;
  background-color: white;
  border: 2px solid white;
  :focus-within {
    border: 2px solid rgb(0, 123, 233);
  }
`;
const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #d0e6ff;
`;
const Header = styled.header`
  background-color: white;
  height: 50px;
  padding: 0 10 0 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
