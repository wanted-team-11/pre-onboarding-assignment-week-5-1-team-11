import { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import styled from "styled-components";
import { getKeywords } from "../axios";
import { BiSearch } from "react-icons/bi";
import SearchListItem from "./SearchListItem";

function SearchInput() {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const focusRef = useRef<HTMLUListElement>(null);

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    switch (key) {
      case "ArrowUp":
        setFocusIndex(focusIndex - 1);
        if (focusIndex <= 0) {
          setFocusIndex(keywords.length - 1);
        }
        break;
      case "ArrowDown":
        setFocusIndex(focusIndex + 1);
        if (focusRef.current?.childElementCount === focusIndex + 1)
          setFocusIndex(0);
        break;
    }
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let timer: any = 0;
    setSearchKeyword(e.target.value);

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setSearchKeyword(e.target.value);
      if (e.target.value.length > 0) {
        getKeywords(e.target.value).then((res) => setKeywords(res));
      } else {
        setKeywords([]);
      }
    }, 500);
  };

  return (
    <StyledInputWrapper>
      <StyledInput onChange={onInputChange} onKeyDown={onInputKeyDown} />
      <StyledButton>검색</StyledButton>
      {keywords.length > 0 && (
        <StyledResultWrapper>
          <StyledUl ref={focusRef}>
            {keywords.map((val, index) => (
              <StyledLi
                key={index}
                isFocus={focusIndex === index ? true : false}
              >
                <BiSearch />
                &nbsp;
                <SearchListItem
                  searchKeyword={searchKeyword}
                  result={val.sickNm}
                />
              </StyledLi>
            ))}
          </StyledUl>
        </StyledResultWrapper>
      )}
    </StyledInputWrapper>
  );
}

export default SearchInput;

const StyledInputWrapper = styled.div``;

const StyledInput = styled.input`
  border: 0;
  width: 400px;
  height: 44px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  font-size: 20px;
  padding-left: 15px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: 0;
  background-color: #539bf5;
  width: 100px;
  height: 47px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  font-size: 18px;
  color: #fff;
`;

const StyledResultWrapper = styled.div`
  background-color: #fff;
  border-radius: 20px;
`;

const StyledUl = styled.ul`
  text-align: left;
  list-style: none;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-left: 0;
`;

const StyledLi = styled.li<{ isFocus?: boolean }>`
  margin-bottom: 15px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  background-color: ${(props) => (props.isFocus ? "#edf5f5" : "#fff")};
`;
