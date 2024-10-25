import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import Pagination from '../components/Pagination'
import { useStateContext } from "../contexts/contextprovider"
import Swal from 'sweetalert2'
export default function UserForm() {

    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();
    const {setNotification} = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    })

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    Swal.fire('Success','User Details Updated Successfuly');
                    navigate('/users')
                }).catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
        else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    Swal.fire('Success','User Details Saved Successfuly');
                    navigate('/users')
                }).catch(err => {
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
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    setUser(data)
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                })
        }, [])
    }
    return (
        <>
            {user.id && <h3>Update User:{user.name}</h3>}
            {!user.id && <h3>New User</h3>}
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
                                <td><input className="form-control" value={user.name} placeholder="Name" onChange={ev => setUser({ ...user, name: ev.target.value })} /></td>
                            </tr>
                            <tr>
                                <label>Email</label>
                                <td><input className="form-control" value={user.email} placeholder="Email" onChange={ev => setUser({ ...user, email: ev.target.value })} />
                                </td>
                            </tr>
                            <tr>
                                <label>Password</label>
                                <td><input className="form-control" value={user.password} onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
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