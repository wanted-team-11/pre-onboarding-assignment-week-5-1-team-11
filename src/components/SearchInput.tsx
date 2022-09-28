import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { getKeywords } from "../axios";
import { BiSearch } from "react-icons/bi";

function SearchInput() {
  const [keywords, setKeywords] = useState<any[]>([]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let timer: any = 0;
    let searchKeyword = e.target.value;

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      searchKeyword = e.target.value;
      if (searchKeyword.length > 0) {
        getKeywords(e.target.value).then((res) => setKeywords(res));
      } else {
        setKeywords([]);
      }
    }, 500);
  };

  return (
    <StyledInputWrapper>
      <StyledInput onChange={onInputChange} />
      <StyledButton>검색</StyledButton>
      {keywords.length > 0 && (
        <StyledResultWrapper>
          <StyledUl>
            {keywords.map((val, index) => (
              <StyledLi key={index}>
                <BiSearch />
                &nbsp;
                {val.sickNm}
              </StyledLi>
            ))}{" "}
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

const StyledLi = styled.li`
  margin-bottom: 15px;
`;
