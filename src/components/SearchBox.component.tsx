import React, { useState, useRef } from "react";
import { getSearchResults } from "../services/api";
import type { Sick } from "../types";
import styled from "styled-components";
import { ReactComponent as SearchSVG } from "../assets/SearchIcon.svg";

import SearchResultList from "./SearchResultList.component";

const DELAY = 200;

const SearchBox = () => {
  const [sickList, setSickList] = useState<Sick[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const getSearchWords = async (value: string) => {
    const [sicks, error] = await getSearchResults(value);
    if (!error && sickList !== null) setSickList(sicks);
    console.log(sicks);
  };

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>();

  const setTimer = (callback: () => void, delay: number) => {
    return setTimeout(callback, delay);
  };

  const resetTimer = (callback: () => void, delay: number) => {
    if (!timer.current) {
      timer.current = setTimer(callback, DELAY);
    } else {
      clearTimeout(timer.current);

      timer.current = setTimer(callback, delay);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchWord(value);
    resetTimer(() => getSearchWords(value), DELAY);
  };

  return (
    <Container>
      <InputWrapper>
        <input
          type="text"
          placeholder="질환명을 입력해주세요"
          onChange={onChange}
        />
        <button>
          <SearchSVG />
        </button>
      </InputWrapper>
      <SearchResultList sickList={sickList} keyword={searchWord} />
    </Container>
  );
};
export default SearchBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 20px 30px;
  input {
    flex-grow: 1;
    font-size: 20px;
    &:focus {
      outline: none;
    }
    border: none;
  }
  button {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: #007be9;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 50%;
    }
  }
`;
