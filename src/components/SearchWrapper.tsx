import styled from "styled-components";

function SearchWrapper({ children }: { children: React.ReactNode }) {
  return <StyledSearchWrapper>{children}</StyledSearchWrapper>;
}

export default SearchWrapper;

const StyledSearchWrapper = styled.div`
  background-color: rgb(202, 233, 255);
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
