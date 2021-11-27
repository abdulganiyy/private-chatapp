import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";

import Messenger from "./pages/Messenger/Messenger";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AuthLayouts from "./Layouts/AuthLayouts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/messenger" />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path={"/home/*"} element={<AuthLayouts />} />
        <Route path={"/register"} element={<Register />} />

        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
