import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";
import Pagination from '../components/Pagination'
import Swal from 'sweetalert2'

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext;
    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
          }).then((result) => {
            if (result.isConfirmed) {
            axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                Swal.fire("Delete","User was successfully deleted");
                getUsers();
            })
        }
        })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                console.log(data);
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    
    return (
        <div>
            <h3>Users</h3>
            <br/>
            <div class="d-flex">
                <Link to="/users/new" className="btn btn-primary">Add new</Link>
            </div>
            <div class="d-flex">

            <div class="container">
                <table class="table table-striped responsive">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn btn-danger" to={'/users/' + u.id}>Edit</Link>&nbsp;&nbsp;
                                    <button onClick={ev => onDelete(u)} className="btn btn-primary">Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}