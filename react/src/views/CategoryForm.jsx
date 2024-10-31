import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"

import Swal from 'sweetalert2'
export default function CategoryForm() {

    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();
 
    const [category, setCategory] = useState({
        id: null,
        name: '',
        description: '',
        photo:''
    })
    const handlePhoto = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setCategory(category => ({...category, photo: reader.result}))
        }
        reader.readAsDataURL(file)
    }
    const onSubmit = (ev) => {
        ev.preventDefault()
        if (category.id) {
            axiosClient.put(`/category/${category.id}`, category)
                .then(() => {
                    Swal.fire('Success', 'Category Details Updated Successfuly');
                    navigate('/category')
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
            axiosClient.post(`/category`, category)
                .then((data) => {
                        console.log(data)
                    Swal.fire('Success', 'Category Details Saved Successfuly');
                    navigate('/category')
                }).catch(err => {
                    
                    const response = err.response;
                    if (response && response.status === 422) {
                        
                        setErrors(response.data.errors);
                        console.log(errors);
                    }
                });
        }
    }
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/category/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    setCategory(data.data)
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                })
        }, [])
    }
    return (
        <>
            {category.id && <h3>Update Category:{category.name}</h3>}
            {!category.id && <h3>New Category</h3>}
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
                    <form onSubmit={onSubmit} encType="mutipart/formdata">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <label>Name</label>
                                    <td><input className="form-control" value={category.name} placeholder="Category" onChange={ev => setCategory({ ...category, name: ev.target.value })} /></td>
                                </tr>
                                <tr>
                                    <label>Description</label>
                                    <td><input className="form-control" value={category.description} placeholder="Description" onChange={ev => setCategory({ ...category, description: ev.target.value })} />
                                    </td>
                                </tr> 
                                
                                <tr>
                                    <label>Photo</label>
                                    <div className='photo-preview'>
                                        <img alt='img_preview' src={category.photo} className={'img-thumbnail'}/>
                                    </div>  
                                    <td> <input type="file" className="w-full px-4 py-2" label="Photo" name="photo" onChange={handlePhoto}/>
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