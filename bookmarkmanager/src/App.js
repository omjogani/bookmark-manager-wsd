import './App.css';
import Sidebar from './Components/Dashboard/Sidebar';
import MainDash from './Components/Dashboard/MainDash/MainDash';
import RightSide from './Components/Dashboard/RigtSide/RightSide';


function App() {
  return (
    <div className="App">
      {/* <Welcome/> */}
      {/* <Dashboard/> */}
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
    </div>
  );
}

export default App;
