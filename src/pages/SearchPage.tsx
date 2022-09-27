import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchPage() {
  return (
    <MainContainer>
      <SearchTitle>국내 모든 임상시험 검색하고 </SearchTitle>
      <SearchTitle>온라인으로 참여하기</SearchTitle>
      <SerachBox>
        <SeaarchIcon />
        <SearchInput />
      </SerachBox>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const SearchTitle = styled.p`
  font-weight: bold;
  font-size: 40px;
  letter-spacing: 3px;
`;

const SerachBox = styled.div`
  width: 500px;
  height: 40px;
  border-radius: 20px;
  border: solid 4px rgba(3, 192, 250, 0.3);
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin: 50px auto auto;
`;
const SeaarchIcon = styled(AiOutlineSearch)`
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  border: none;
  margin-left: 10px;
  overflow: auto;
  font-size: 20px;
  padding-left: 5px;
  outline: none;
`;
