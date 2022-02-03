import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ItemInfo from "./components/ItemInfo/ItemIfom";
function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/more-info" element={<ItemInfo />} />
      </Routes>
    </div>
  );
}

export default App;
