import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import SearchResultDataList from "../components/SearchResultDataList";
import useDebounce from "../hooks/useDebounce.hook";
import useOnClickOutside from "../hooks/useOnClickOutSide";
import getFetchData from "../services/getFetchData.service";
import GetFetchType from "../types/getFetchType";

const ARROWDOWN = "ArrowDown";
const ARROWUP = "ArrowUp";
const ESCAPE = "Escape";

const SearchPage = () => {
  const [sickListVisible, setSickListVisible] = useState<boolean>(false);
  const [fetchedSickList, setFetchedSickList] = useState<GetFetchType[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [liTagIndex, setLiTagIndex] = useState<number>(-1);
  const inputMouseFocusRef = useRef<HTMLInputElement>(null);
  const sickListKeyBoardMoveRef = useRef<HTMLUListElement>(null);
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 1000);

  useOnClickOutside(inputMouseFocusRef, () => setSickListVisible(() => false));

  useEffect(() => {
    const fetchInput = async () => {
      if (debouncedSearchInputValue && liTagIndex === -1) {
        setLiTagIndex(() => -1);
        const data = await getFetchData(debouncedSearchInputValue);
        setFetchedSickList(() => [...data]);
      }
      return;
    };
    fetchInput();
  }, [debouncedSearchInputValue, liTagIndex]);

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchInputValue(() => value);
    setLiTagIndex(() => -1);
  };

  const onSubmitInputValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onClickInputElementTag = () => {
    setSickListVisible(() => true);
  };

  const onKeyDownSetIndex = (event: KeyboardEvent) => {
    if (debouncedSearchInputValue.length > 0 && fetchedSickList.length > 0) {
      switch (event.key) {
        case ARROWDOWN:
          setLiTagIndex((prev) => prev + 1);
          if (
            sickListKeyBoardMoveRef.current?.childElementCount ===
            liTagIndex + 1
          ) {
            setLiTagIndex(() => 0);
          }
          break;

        case ARROWUP:
          setLiTagIndex((prev) => prev - 1);

          if (liTagIndex <= 0) {
            setLiTagIndex(() => -1);
          }
          break;

        case ESCAPE:
          setLiTagIndex(() => -1);
          break;
      }
    }
  };

  return (
    <PageWrapper>
      <Header />
      <Container>
        <SearchBox>
          <SearchForm onSubmit={onSubmitInputValue}>
            <input
              value={fetchedSickList[liTagIndex]?.sickNm || searchInputValue}
              ref={inputMouseFocusRef}
              type="search"
              spellCheck={false}
              placeholder={"질환명을 입력하세요."}
              onChange={onChangeInputValue}
              onClick={onClickInputElementTag}
              onKeyDown={onKeyDownSetIndex}
            />
            <button type="submit">검색</button>
          </SearchForm>
          <SearchResultDataList
            liTagIndex={liTagIndex}
            sickListKeyBoardMoveRef={sickListKeyBoardMoveRef}
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
