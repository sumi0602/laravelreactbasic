import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import Navbar from "../partials/Nav";
import SideBar from "../partials/SideBar";

export default function GuestLayout() {
   const { token } = useStateContext()

   if (token) {
      return <Navigate to='/users' />
   }
   return (
      <div>
         <div>
            <Outlet />
         </div>
      </div>
   )
}