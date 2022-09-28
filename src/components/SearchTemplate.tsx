import React from "react";
import styled from "styled-components";

interface Children {
  children: React.ReactNode;
}

const SearchTemplate = ({ children }: Children) => {
  return (
    <SearchWrppaer>
      <MainTitle>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </MainTitle>
      {children}
    </SearchWrppaer>
  );
};

export default SearchTemplate;

const SearchWrppaer = styled.section`
  margin: 100px auto 0;
  width: 500px;
  height: auto;
`;

const MainTitle = styled.header`
  font-size: 26px;
  text-align: center;
  font-weight: bolder;
  margin-bottom: 20px;
`;
