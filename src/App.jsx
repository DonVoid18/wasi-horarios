import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Board from "./pages/Board";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* ROUTES PROTECTED */}

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["Admin", "User"]} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
