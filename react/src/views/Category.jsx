import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";
import Swal from 'sweetalert2'

export default function Category() {

    const [categorys, setCategory] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getCategory();
    }, [])

    const onDelete = (cat) => {
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
                axiosClient.delete(`/category/${cat.id}`)
                    .then(() => {
                        Swal.fire("Delete", "Category was successfully deleted");
                        getCategory();
                    })
            }
        })
    }

    const getCategory = () => {
        setLoading(true)
        axiosClient.get('/category')
            .then(({ data }) => {
                console.log(data);
                setCategory(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <h3>Category</h3>
            <br />
            <div class="d-flex">
                <Link to="/category/new" className="btn btn-primary">Add new</Link>
            </div>
            <div class="d-flex">

                <div class="container">
                    <table class="table table-striped responsive">
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {categorys.map(category => (
                                <tr>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td> <img alt='img_preview' width="100" height="50" src={category.photo} className={'img-thumbnail'}/></td>
                                    <td>
                                        <Link className="btn btn-danger" to={'/category/' + category.id}>Edit</Link>&nbsp;&nbsp;
                                        <button onClick={ev => onDelete(category)} className="btn btn-primary">Delete</button>
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