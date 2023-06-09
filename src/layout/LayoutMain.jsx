import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const LayoutMain = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default LayoutMain;
