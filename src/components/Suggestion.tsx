import styled from "styled-components";

interface IndexProp {
  isLast: boolean;
  isSelected: boolean;
}

interface Prop extends IndexProp {
  value: string;
  keyWord: string;
}

function Suggestion(props: Prop) {
  const { isLast, isSelected, value, keyWord } = props;
  const matchText = value.split(new RegExp(`(${keyWord})`, "gi"));

  return (
    <Container
      isLast={isLast}
      isSelected={isSelected}
      onClick={() => alert(value)}
    >
      <SearchIcon className="material-symbols-outlined">search</SearchIcon>
      <Text>
        {matchText.map((text, index) =>
          text === keyWord ? <Bold key={index}>{text}</Bold> : text
        )}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 490px;
  height: 50px;
  border-radius: ${(props: IndexProp) => (props.isLast ? "0 0 10px 10px" : 0)};
  background-color: ${(props: IndexProp) =>
    props.isSelected ? "lightgray " : "white"};
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
