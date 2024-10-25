import { useContext, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client";
import Dashboard from "../views/Dashboard";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to='/login' />
    }
    const onLogout = (ev) => {
        ev.preventDefault()
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
                console.log(data);
            })
            .catch(() => {

            })
    }, [])

    return (
        <Dashboard />
    )
}