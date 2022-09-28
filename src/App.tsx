import { useEffect, useState } from "react";
import fetchRecommendWord, { Sick } from "./fetchRecommendWord";
import styled from "styled-components";

const hightlightWord = (
  fullWord: string,
  highlight: string,
  index: number,
  selected: number
) => {
  return (
    <RecommendItem is_selected={index === selected}>
      <a href="#">
        {fullWord.split(highlight).map((e, i, arr) => {
          return i < arr.length - 1 ? (
            <>
              {e}
              <strong>{highlight}</strong>
            </>
          ) : (
            e
          );
        })}
      </a>
    </RecommendItem>
  );
};

function App() {
  const [keyword, setKeyword] = useState("");
  const [isKeyword, setIsKeyword] = useState(true);
  const [recommendWords, setRecommendWords] = useState<Sick[]>();
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(-1);

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isKeyword) {
      setKeyword(e.target.value);
      setIndex(-1);
    }
    setIsKeyword(true);
    setValue(e.target.value);
  };

  const handleRecommendWord = async () => {
    setRecommendWords(await fetchRecommendWord(keyword));
  };

  const handleKeyboardArrow = (e: React.KeyboardEvent) => {
    if (!recommendWords || recommendWords.length <= 0) return;
    if (
      (e.code === "ArrowDown" || e.code === "ArrowRight") &&
      e.nativeEvent.isComposing === false
    ) {
      setIsKeyword(false);
      if (index === recommendWords.length - 1) {
        setValue(recommendWords[0].sickNm);
        setIndex(0);
      } else {
        setValue(recommendWords[index + 1].sickNm);
        setIndex(index + 1);
      }
    } else if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
      if (index === 0) {
        setKeyword("");
        setRecommendWords([]);
        setIndex(-1);
      }
      setIsKeyword(false);
      setValue(recommendWords[index - 1].sickNm);
      setIndex(index - 1);
    } else if (e.code === "Escape") {
      setRecommendWords([]);
      setIndex(-1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleRecommendWord, 200);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        value={value}
        onChange={handleKeyword}
        onKeyDown={handleKeyboardArrow}
      />
      {keyword.length === 0 ? null : recommendWords &&
        recommendWords.length > 0 ? (
        <RecommendContainer>
          {recommendWords.map(({ sickNm }, i) =>
            hightlightWord(sickNm, keyword, i, index)
          )}
        </RecommendContainer>
      ) : keyword.length && !recommendWords ? (
        <div>검색어 없음</div>
      ) : null}
    </form>
  );
}

export default App;

const RecommendContainer = styled.ul`
  width: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const RecommendItem = styled.li<{ is_selected: boolean }>`
  a:link {
    color: black;
    text-decoration: none;
  }
  & a:visited {
    color: black;
    text-decoration: none;
  }
  &:hover {
    background-color: #e8e8e8;
  }

  & a:focus {
    background-color: #e8e8e8;
  }

  ${({ is_selected }) => is_selected && "background-color: #e8e8e8;"}
`;
