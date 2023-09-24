import Home from "./layout/home/Home";
import Profile from "./layout/profile/Profile";
import Datasensor from "./layout/data_sensor/DataSensor";
import Action from "./layout/action_history/Action";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact index element={<Home/>} ></Route>
      <Route path = "profile" element = {<Profile/>}></Route>
      <Route path = "action-history" element = {<Action/>}></Route>
      <Route path="data-sensor" element = {<Datasensor/>}></Route>
    </Routes>
  );
}

export default App;
