import React, {useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Link} from 'react-router-dom'

import AuthService from '../../../services/auth.service'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../login.css'



const required = (value) => {
    if (!value) {
        return (
            <div>
                <p className="alert-danger">This field is required!</p>
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    props.history.push("/home");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
            <div className="modal-dialog modal-login ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign In</h4>
                    </div>

                    <div className="modal-body" >
                        <Form onSubmit={handleLogin} ref={form}  >

                            <div className="form-group">
                                <div className="input-group"
                                >
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}
                                        placeholder="Username"
                                        style={{fontSize: '20px'}}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                        placeholder="Password"
                                        style={{fontSize: '20px'}}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block btn-lg" disabled={loading}

                                >
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm mr-2"/>
                                    )}
                                    <p style={{marginBottom: '5px'}}>
                                        Sign In
                                    </p>
                                </button>
                            </div>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />

                            <p className="hint-text font-weight-normal"><Link to={"ForgotPassword"}>Forgot Password?</Link></p>
                            <div className="modal-footer">
                                <p className="font-weight-normal">Don't have an account?
                                    <Link to={"/Register"} className="ml-1">Register here!</Link>
                                </p>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
    );
};

export default Login;
