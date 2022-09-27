import BlueArea from "./components/BlueArea.layout";
import Doctors from "./components/DoctorImage.component";
import EngineersImage from "./components/EngineersImage.component";
import SearchBox from "./components/SearchBox.component";

function App() {
  return (
    <BlueArea>
      <Doctors />
      <SearchBox />
      <EngineersImage />
    </BlueArea>
  );
}

export default App;
