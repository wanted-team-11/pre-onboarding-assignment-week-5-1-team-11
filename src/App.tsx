import React from "react";
import "./App.css";
import SearchTitle from "./components/SearchTitle";
import SearchInput from "./components/SearchInput";
import SearchWrapper from "./components/SearchWrapper";

function App() {
  return (
    <div className="App">
      <SearchWrapper>
        <SearchTitle>
          국내 모든 임상시험 검색하고 온라인으로 참여하기
        </SearchTitle>
        <SearchInput />
      </SearchWrapper>
    </div>
  );
}

export default App;
