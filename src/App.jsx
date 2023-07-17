import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import TableCourses from "./pages/TableCourses";
import LayoutMain from "./layout/LayoutMain";
import TestTable from "./components/TestTable";
const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* ROUTES PROTECTED */}

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["Admin", "User"]} />}>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route path="boards/:id/courses" element={<TableCourses />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};
export default App;
