import { Outlet } from "react-router-dom";
import Navbar from "../partials/Nav";
import SideBar from "../partials/SideBar";
import { useStateContext } from "../contexts/contextprovider";

export default function Dashboard() {
  const {notification} = useStateContext()

  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <SideBar />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}