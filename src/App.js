import Home from "./layout/home/Home";
import Profile from "./layout/profile/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact index element={<Home/>} ></Route>
      <Route path = "profile" element = {<Profile/>}></Route>
    </Routes>
  );
}

export default App;
