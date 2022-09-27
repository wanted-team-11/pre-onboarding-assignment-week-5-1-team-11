import styled from "styled-components";

interface Prop {
  isLast?: boolean;
  isSelected: boolean;
  value: string;
  keyWord: string;
}

function Suggestion(props: Prop) {
  const { isLast, isSelected, value, keyWord } = props;
  const matchText = value.split(new RegExp(`(${keyWord})`, "gi"));

  return (
    <Container
      isLast={isLast}
      isSlected={isSelected}
      onClick={() => alert(value)}
    >
      <SearchIcon className="material-symbols-outlined">search</SearchIcon>
      <Text>
        {matchText.map((text, index) =>
          text === keyWord ? (
            <span key={index} style={{ fontWeight: 700 }}>
              {text}
            </span>
          ) : (
            text
          )
        )}
      </Text>
    </Container>
  );
}

const Container = styled.div<{
  isLast: boolean | undefined;
  isSlected: boolean;
}>`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 490px;
  height: 50px;
  border-radius: ${(props) => (props.isLast ? "0 0 10px 10px" : 0)};
  background-color: ${(props) => (props.isSlected ? "lightgray " : "white")};
  &:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
  }
`;

const SearchIcon = styled.div`
  position: relative;
  left: 10px;
`;

const Text = styled.div`
  position: relative;
  width: 85%;
  left: 20px;
`;

const Bold = styled.span`
  font-weight: 700;
`;

export default Suggestion;
