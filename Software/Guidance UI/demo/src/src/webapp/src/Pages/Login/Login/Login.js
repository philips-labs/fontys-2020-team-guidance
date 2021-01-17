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

    const [successful, setSuccessful] = useState(false);
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
                    setSuccessful(true);
                    setLoading(false);
                    setMessage("Login Successful")
                    props.history.push("/home")
                },
                () => {
                    setSuccessful(false);
                    setLoading(false);
                    setMessage("Invalid account credentials");
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

                    <div className="modal-body">
                        <Form onSubmit={handleLogin} ref={form}>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            onChange={onChangeUsername}
                                            validations={[required]}
                                            data-testid="login-input-username"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={onChangePassword}
                                            validations={[required]}
                                            data-testid="login-input-password"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block"
                                                disabled={loading}
                                                data-testid="login-button-submit"
                                        >
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"/>
                                            )}
                                            <span>Login</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            {message && (
                                <div className="form-group">
                                    <div
                                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                                        role="alert"
                                    >
                                        <p style={{paddingLeft: '25%', paddingTop: 10}}>
                                            {message}
                                        </p>
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
