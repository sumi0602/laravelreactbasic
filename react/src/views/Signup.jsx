
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import "../index"
export default function Signup() {
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
       
        axiosClient.post('/signup', payload).then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        }).catch(err => {
            console.log(err)
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        });

    }

    return (
        <>
            <div id="login">
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form onSubmit={onSubmit} id="login-form" className="form" action="" method="post">
                                    <h3 class="text-center text-info">Signup</h3>

                                    {errors && <div className="alert">
                                        {Object.keys(errors).map(key => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                    }
                                    <div className="form-group">
                                        <label for="username" className="text-info">UserName:</label><br />
                                        <input ref={nameRef} type="text" className="form-control" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label for="email" className="text-info">Email:</label><br />
                                        <input ref={emailRef} type="email" className="form-control" placeholder="email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="password" className="text-info">Password:</label><br />
                                        <input ref={passwordRef} type="password" placeholder="password" className="form-control" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button className="btn btn-info btn-md">
                                            Save
                                        </button>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        Already Have an Account?<Link to="/login">Login</Link>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}