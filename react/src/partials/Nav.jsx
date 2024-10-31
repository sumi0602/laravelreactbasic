
import React from "react";
import { useStateContext } from "../contexts/contextprovider";
import { useContext, useEffect } from "react";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2'

const Nav = () => {
    const { user, token, setUser, setToken } = useStateContext()
    if (!token) {
        return <Navigate to='/login' />
    }
    const onLogout = (ev) => {
        ev.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                    withCredentials: true,
                });
                axiosClient.post('/logout')
                    .then((data) => {
                        console.log(data);
                        setUser({})
                        setToken(null)
                    })
            }
        });

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
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand ps-3" href="index.html">Fashion Store</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                    <p className="text-white">{user.name}</p>
                    <button className="btn btn-primary" onClick={onLogout}>Logout</button>
                </div>
            </form>
        </nav>
    )
}

export default Nav;