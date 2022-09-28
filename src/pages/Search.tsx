import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Suggestion from "../components/Suggestion";
import styled from "styled-components";
import { fetchSuggetedList } from "../api/searchApi";
import useDebounce from "../hooks/useDebounce";

interface SuggetedSickList {
  sickCd: string;
  sickNm: string;
}

function Search() {
  const [suggetedSickList, setSuggetedSickList] = useState<SuggetedSickList[]>(
    []
  );
  const [keyWord, setKeyWord] = useState("");
  const [selected, setSelected] = useState(0);
  const debounceKeyWord = useDebounce(keyWord);
  const isCached = localStorage.getItem(debounceKeyWord) !== null;
  const cachedResult = JSON.parse(localStorage.getItem(debounceKeyWord)!);
  const isStale =
    JSON.parse(localStorage.getItem(debounceKeyWord + "Exp")!) < Date.now();

  const fetchSuggetedListWithCaching = () => {
    fetchSuggetedList(debounceKeyWord)
      .then((res) => {
        localStorage.setItem(debounceKeyWord, JSON.stringify(res.data));
        localStorage.setItem(
          debounceKeyWord + "Exp",
          JSON.stringify(Date.now() + 60 * 60 * 1000)
        );
        setSuggetedSickList(res.data);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          alert(error.response?.data);
        } else {
          alert(error);
        }
      });
  };

  useEffect(() => {
    if (isCached && isStale) {
      localStorage.removeItem(debounceKeyWord);
      localStorage.removeItem(debounceKeyWord + "Exp");
      fetchSuggetedListWithCaching();
    } else if (isCached) {
      setSuggetedSickList(cachedResult);
    } else if (!isCached && debounceKeyWord !== "") {
      fetchSuggetedListWithCaching();
    }
  }, [debounceKeyWord]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyWord(value);
  };

  const handleSelect = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyWord === "") setSelected(0);
    else if (e.key === "Backspace") setSelected(0);
    else if (selected >= 2 && e.key === "ArrowUp") setSelected(selected - 1);
    else if (selected < suggetedSickList.length && e.key === "ArrowDown")
      setSelected(selected + 1);
    else if (selected > 0 && e.key === "Enter")
      alert(suggetedSickList[selected - 1].sickNm);
    else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)) {
      setSelected(-1);
    }
  };

  const isNotFound = keyWord !== "" && suggetedSickList.length === 0;
  const isExist = keyWord !== "" && suggetedSickList.length !== 0;
  const isSearched = keyWord !== "";

  return (
    <Container>
      <Header>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </Header>
      <InputBox>
        <SearchIcon className="material-symbols-outlined">search</SearchIcon>
        <Input
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={keyWord}
          onChange={handleInput}
          onKeyDown={handleSelect}
        />
        <Button>검색</Button>
      </InputBox>
      {isNotFound && (
        <NotFound>
          <Text>검색어 없음</Text>
        </NotFound>
      )}
      {isExist && (
        <SuggestionTitle>
          <Text>추천 검색어</Text>
        </SuggestionTitle>
      )}
      {isSearched &&
        suggetedSickList.map((suggetedSick, index) => (
          <Suggestion
            key={suggetedSick.sickCd}
            value={suggetedSick.sickNm}
            isLast={index === suggetedSickList.length - 1}
            isSelected={index === selected - 1}
            keyWord={keyWord}
          />
        ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  margin: 0 auto;
  background-color: rgb(192, 228, 255);
  padding: 50px 0;
`;

const Header = styled.h1`
  font-size: 34px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
`;

const InputBox = styled.div`
  position: relative;
  width: 490px;
  height: 70px;
  margin: 30px auto;
  background-color: white;
  border-radius: 50px;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Input = styled.input`
  position: relative;
  width: 400px;
  padding: 0 0 0 30px;
  border: 0;
  outline: none;
  top: 10px;
  left: 20px;
  font-size: 1rem;
  background-color: transparent;
`;

const Button = styled.button`
  position: relative;
  top: 10px;
  cursor: pointer;
  width: 48px;
  height: 48px;
  font-size: 16px;
  border: 0;
  border-radius: 48px;
  background-color: #007be9;
  color: white;
`;

const NotFound = styled.div`
  margin: 0 auto;
  width: 490px;
  font-size: 30px;
  padding: 30px 0;
  background-color: white;
  border-radius: 30px;
`;

const SuggestionTitle = styled.div`
  margin: 0 auto;
  width: 490px;
  padding: 10px 0 0;
  background-color: white;
  border-radius: 10px 10px 0 0;
`;

const Text = styled.div`
  color: gray;
  padding: 5px 10px;
`;

export default Search;
