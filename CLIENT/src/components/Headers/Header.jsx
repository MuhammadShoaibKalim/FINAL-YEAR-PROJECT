import { useSelector } from "react-redux";
import HeaderUser from "./HeaderUser";
import HeaderSuperAdmin from "../Admin/SuperAdmin/HeaderSuperAdmin";
import HeaderLabAdmin from "./HeaderLabAdmin";
import HeaderGuest from "./HeaderGuest";
import Topbar from "../Layouts/Topbar";

const Header = () => {
  const user = useSelector((state) => state.Auth?.user);
  const role = user?.role?.toLowerCase()?.replace(/\s+/g, '');

  if (!user) return <HeaderGuest />;

  if (role === "superadmin") {
    return <HeaderSuperAdmin />;
  }

  if (role === "labadmin") {
    return <HeaderLabAdmin />;
  }

  return (
    <>
      <Topbar />
      <HeaderUser />
    </>
  );
};

export default Header;
