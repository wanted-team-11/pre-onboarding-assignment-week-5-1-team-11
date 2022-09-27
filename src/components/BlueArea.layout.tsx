import styled from "styled-components";

const BlueArea = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default BlueArea;

const Container = styled.div`
  background-color: #cae9ff;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
