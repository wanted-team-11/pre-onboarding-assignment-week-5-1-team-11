import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchTemplate from "./SearchTemplate";
import SearchResults from "./SearchResults";
import { getSearchData, getSpecificData } from "../api";
import { handleChange } from "../store/searchValue";
import { ISearchValue } from "../types/data.type";

const ARROWUP = "ArrowUp";
const ARROWDOWN = "ArrowDown";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchLists, setSearchLists] = useState([]);
  const [listCounter, setListCounter] = useState(-1);

  const listRef = useRef<HTMLUListElement | null>(null);

  const searchValue = useSelector((state: ISearchValue) => state.search.value);

  const listCount = listRef.current?.childElementCount! - 1;

  const saveSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChange(`${e.target.value}`));
  };

  const requestSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue === null || searchValue === "") {
      alert("검색어를 입력해주세요");
    } else {
      getSpecificData(`${searchValue}`)
        .then((res) => {
          console.info("call API");
          setSearchLists(res);
        })
        .catch((e) => console.error(e));
    }
  };

  const handleKeyChange = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ARROWUP: {
        if (listCounter > 0) setListCounter((prev) => prev - 1);
        break;
      }
      case ARROWDOWN: {
        if (listCounter < listCount!) setListCounter((prev) => prev + 1);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    return () => {
      getSearchData()
        .then((res) => {
          console.info("call API");
          setSearchLists(res);
        })
        .catch((e) => console.error(e));
    };
  }, []);

  return (
    <SearchTemplate>
      <div>
        <SearchForm onSubmit={requestSearchData}>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchBar
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={saveSearchValue}
            onKeyDown={handleKeyChange}
          />
          <SearchButton>검색</SearchButton>
        </SearchForm>
        <SearchResults
          listRef={listRef}
          searchLists={searchLists}
          listCounter={listCounter}
        />
      </div>
    </SearchTemplate>
  );
};

export default SearchBox;

const SearchForm = styled.form`
  position: relative;
  margin-bottom: 10px;
`;

const SearchBar = styled.input`
  width: 450px;
  height: 50px;
  border: none;
  border-radius: 100px;
  font-size: 18px;
  padding: 5px 50px;
  padding-right: 85px;
  &::placeholder {
    color: lightgray;
  }
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  width: 75px;
  height: 50px;
  top: 0;
  right: 0%;
  border: none;
  border-radius: 0 100px 100px 0;
  background-color: rgba(52, 121, 225, 1);
  color: #fff;
  font-size: 16px;
  font-weight: bolder;
  transition: background 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(52, 121, 225, 0.7);
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 35%;
  left: 5%;
  width: 16px;
  height: 16px;
`;
