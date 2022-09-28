import styled from "styled-components";

function Input() {
  return (
    <StyledInputWrapper>
      <StyledInput />
    </StyledInputWrapper>
  );
}

export default Input;

const StyledInputWrapper = styled.div``;

const StyledInput = styled.input`
  border: 0;
  width: 400px;
  height: 40px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  font-size: 20px;
  padding-left: 15px;
`;
