
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Login() {
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        setErrors(null)
        axiosClient.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        });
        axiosClient.post('/login', payload).then(({ data }) => {
            setUser(data.user)
            setToken(data.token)
        }).catch(err => {
            const response = err.response;

            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    setErrors({
                        email: [response.data.message]
                    })
                }

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
                                    <h3 class="text-center text-info">Login</h3>

                                    {errors && <div className="alert">
                                        {Object.keys(errors).map(key => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                    }
                                    <div className="form-group">
                                        <label for="username" className="text-info">Email:</label><br />
                                        <input ref={emailRef} type="email" className="form-control" placeholder="email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="username" className="text-info">Password:</label><br />
                                        <input ref={passwordRef} type="password" placeholder="password" className="form-control" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button className="btn btn-info btn-md">
                                            Login
                                        </button>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <Link to='/signup'>Register here</Link>
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