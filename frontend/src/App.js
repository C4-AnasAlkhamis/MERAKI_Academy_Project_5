import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ItemInfo from "./components/ItemInfo/ItemInfo";
import Register from "./components/register/Register";
function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/more-info" element={<ItemInfo />} />
      </Routes>
    </div>
  );
}

export default App;
