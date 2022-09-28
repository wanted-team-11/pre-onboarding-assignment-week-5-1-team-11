import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 678px;
  height: 560px;
  background-color: #d0e8fd;
`;

export const SearchInputBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 30px;
`;

export const SearchTitle = styled.div`
  margin-top: 15px;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`;

export const SearchIcon = styled(BiSearch)`
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 23px;
`;

export const SearchInput = styled.input`
  width: 520px;
  height: 55px;
  background-color: white;
  border-radius: 20px 0 0 20px;
  border: none;
  padding: 0 50px;
`;

export const SearchButton = styled.button`
  width: 90px;
  height: 55px;
  color: white;
  background-color: #5285bf;
  border-radius: 0 20px 20px 0;
  border: none;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #ababab;
  }
`;

export const SearchResultBox = styled.div`
  margin-top: 20px;
  overflow: hidden;
  border-radius: 20px;
  background-color: white;
`;

export const SearchScroll = styled.div`
  width: 640px;
  height: 320px;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const RecommendResult = styled.div`
  margin: 10px 0 10px 10px;
  padding: 13px;
  font-size: 15px;
  background-color: white;
  color: gray;
  font-weight: bold;
`;

export const SearchResult = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchText = styled.div`
  padding: 20px;
  margin-left: 40px;
  font-size: 15px;
`;

export const DataNotExist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 230px;
  font-size: 30px;
  color: #ababab;
`;
