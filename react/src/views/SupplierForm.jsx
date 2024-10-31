import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"

import Swal from 'sweetalert2'
export default function SupplierForm() {

    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 1, text: 'India'},
        {value: 2, text: 'Germany'},
        {value: 3, text: 'Australia'},
      ];
     

    const [supplier, setSupplier] = useState({
        id: null,
        name: '',
        address: '',
        tax_no:'',
        country:'',
        mobile_no:'',
        email:'',
        status:''
    })
    const onSubmit = (ev) => {
        ev.preventDefault()
        if (supplier.id) {
            axiosClient.put(`/supplier/${supplier.id}`, supplier)
                .then(() => {
                    Swal.fire('Success', 'Supplier Details Updated Successfuly');
                    navigate('/supplier')
                }).catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
        else {
            axiosClient.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });
            axiosClient.post(`/supplier`, supplier)
                .then((data) => {
                        console.log(data)
                    Swal.fire('Success', 'Supplier Details Saved Successfuly');
                    navigate('/supplier')
                }).catch(err => {
                    console.log('kk');
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    }
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/supplier/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    setSupplier(data.data)
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                })
        }, [])
    }
    return (
        <>
            {supplier.id && <h3>Update Supplier:{supplier.name}</h3>}
            {!supplier.id && <h3>New Supplier</h3>}
            <div class="d-flex flex">

                {loading && (
                    <div className="text-center">Loading ..</div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => {
                        <p key={key}>{errors[key][0]}</p>
                    })}
                </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <label>Name</label>
                                    <td><input className="form-control" value={supplier.name} placeholder="Supplier Name" onChange={ev => setSupplier({ ...supplier, name: ev.target.value })} /></td>
                                </tr>
                                <tr>
                                    <label>Address</label>
                                    <td><textarea className="form-control" value={supplier.address} placeholder="Address" onChange={ev => setSupplier({ ...supplier, address: ev.target.value })} />
                                    </td>
                                </tr> 
                                <tr>
                                    <label>Tax No</label>
                                    <td> <input className="form-control" value={supplier.tax_no} onChange={ev => setSupplier({ ...supplier, tax_no: ev.target.value })}/>
                                    </td>
                                </tr>
                                <tr>
                                 <label>Country</label>
                                 <td>
                                 <select value={supplier.country} onChange={ev => setSupplier({ ...supplier, country: ev.target.value })}>
                                    {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                    ))}
                                </select>
                                 </td>
                                </tr>
                                <tr>
                                  <label>Mobile No</label>
                                  <td> <input className="form-control" name="mobile_no"  value={supplier.mobile_no} onChange={ev => setSupplier({ ...supplier, mobile_no: ev.target.value })}/>
                                  </td>
                                </tr>
                                <tr>
                                    <label>Email</label>
                                    <td> <input className="form-control" name="email"  value={supplier.email} onChange={ev => setSupplier({ ...supplier, email: ev.target.value })}/>
                                </td>
                                </tr>
                                <tr>
                                    <label>Status</label>
                                    <td> <select className="status form-control"  value={supplier.status} onChange={ev => setSupplier({ ...supplier, status: ev.target.value })} ><option value={1}>Active</option><option value={0}>InActive</option></select>
                                </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary">Save</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </form>
                }
            </div>
        </>
    )
}