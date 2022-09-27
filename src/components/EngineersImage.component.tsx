import { ReactComponent as Engineer1SVG } from "../assets/Engineer1.svg";
import { ReactComponent as Engineer2SVG } from "../assets/Engineer2.svg";
import styled from "styled-components";

const EngineersImage = () => (
  <div>
    <Engineer1 />
    <Engineer2 />
  </div>
);

export default EngineersImage;

const Engineer1 = styled(Engineer1SVG)`
  width: 100px;
`;

const Engineer2 = styled(Engineer2SVG)`
  width: 100px;
`;
