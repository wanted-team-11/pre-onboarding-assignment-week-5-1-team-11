import styled from "styled-components";

function Input() {
  return (
    <StyledInputWrapper>
      <StyledInput />
      <StyledButton>검색</StyledButton>
    </StyledInputWrapper>
  );
}

export default Input;

const StyledInputWrapper = styled.div``;

const StyledInput = styled.input`
  border: 0;
  width: 400px;
  height: 44px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  font-size: 20px;
  padding-left: 15px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: 0;
  background-color: #539bf5;
  width: 100px;
  height: 47px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  font-size: 18px;
  color: #fff;
`;
