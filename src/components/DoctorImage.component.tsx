import { ReactComponent as DoctorsSVG } from "../assets/Doctors.svg";
import styled from "styled-components";

const DoctorImage = () => (
  <div>
    <Doctors />
  </div>
);

export default DoctorImage;

const Doctors = styled(DoctorsSVG)`
  width: 100px;
`;
