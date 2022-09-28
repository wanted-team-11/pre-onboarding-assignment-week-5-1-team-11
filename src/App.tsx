import React from "react";
import "./App.css";
import SearchTitle from "./components/SearchTitle";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <div className="App">
      <SearchTitle>국내 모든 임상시험 검색하고 온라인으로 참여하기</SearchTitle>
      <SearchInput />
    </div>
  );
}

export default App;
