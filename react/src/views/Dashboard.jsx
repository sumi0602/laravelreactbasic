import { Outlet } from "react-router-dom";
import Navbar from "../partials/Nav";
import SideBar from "../partials/SideBar";

export default function Dashboard() {

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