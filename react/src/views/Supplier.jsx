import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";
import Swal from 'sweetalert2'

export default function Supplier() {

    const [suppliers, setSupplier] = useState([]);
    const [loading, setLoading] = useState(false)   
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 1, text: 'India'},
        {value: 2, text: 'Germany'},
        {value: 3, text: 'Australia'},
      ];

    useEffect(() => {
        getSupplier();
        getCountry();
    }, [])

    const onDelete = (supplier) => {
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
                axiosClient.delete(`/supplier/${supplier.id}`)
                    .then(() => {
                        Swal.fire("Delete", "Supplier was successfully deleted");
                        getSupplier();
                    })
            }
        })
    }

    const getSupplier = () => {
        setLoading(true)
        axiosClient.get('/supplier')
            .then(({ data }) => {
                console.log(data);
                setSupplier(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    
    const getCountry = () => {
        setLoading(true)
        axiosClient.get('/country')
            .then(({ data }) => {
                console.log(data);
                setSupplier(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    return (
        <div>
            <h3>Supplier</h3>
            <br />
            <div class="d-flex">
                <Link to="/supplier/new" className="btn btn-primary">Add new</Link>
            </div>
            <div class="d-flex">

                <div class="container">
                    <table class="table table-striped responsive">
                        <thead>
                            <th>Supplier Name</th>
                            <th>Address</th>
                            <th>Tax No</th>
                            <th>Country</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {suppliers.map(supplier => (
                                <tr>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.tax_no}</td>
                                    <td>{supplier.countries.name}</td>
                                    <td>{supplier.mobile_no}</td>
                                    <td>{supplier.email}</td>
                                    <td>{ supplier.status == 1 ? 'Active' :'Inactive'}</td>
                                    <td>
                                        <Link className="btn btn-danger" to={'/supplier/' + supplier.id}>Edit</Link>&nbsp;&nbsp;
                                        <button onClick={ev => onDelete(supplier)} className="btn btn-primary">Delete</button>
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