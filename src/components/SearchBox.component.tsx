import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import queryInstance from "../utils/search-result-cache";
import type { Sick } from "../types";
import styled from "styled-components";
import { ReactComponent as SearchSVG } from "../assets/SearchIcon.svg";

import SearchResultList from "./SearchResultList.component";

const SearchBox = () => {
  const [sickList, setSickList] = useState<Sick[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const { resetTimer } = useDebounce();

  const getSearchWords = async (value: string) => {
    const { sickList: sicks, isError } = await queryInstance.query(value);
    if (!isError && sicks !== null) setSickList(sicks);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchWord(value);
    resetTimer(() => getSearchWords(value), 200);
  };

  const [focused, setFocused] = useState(0);
  const down = () => {
    if (focused >= sickList.length - 1) return;
    setFocused((prev) => prev + 1);
  };
  const up = () => {
    if (focused <= 0) return;
    setFocused((prev) => prev - 1);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "ArrowDown": {
        if (!e.nativeEvent.isComposing) down();
        break;
      }
      case "ArrowUp": {
        up();
        break;
      }
    }
  };

  useEffect(() => {
    setFocused(-1);
  }, [searchWord]);

  return (
    <Container>
      <InputWrapper>
        <input
          type="text"
          placeholder="질환명을 입력해주세요"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={sickList[focused]?.sickNm || searchWord}
        />
        <button>
          <SearchSVG />
        </button>
      </InputWrapper>
      <SearchResultList
        sickList={sickList}
        keyword={searchWord}
        focused={focused}
      />
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
