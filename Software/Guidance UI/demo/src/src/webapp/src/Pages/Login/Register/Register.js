import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../../services/auth.service";
import { createMemoryHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../login.css'



const required = (value) => {
    if (!value) {
        return (
            <div className="alert-danger" role="alert">
                <p className="alert-message">This field is required!</p>
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert-danger" role="alert">
                <p className="alert-message">This is not a valid email.</p>
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert-danger" role="alert">
                <p className="alert-message">The username must be between 3 and 20 characters.</p>
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert-danger" role="alert">
                <p className="alert-message">The password must be between 6 and 40 characters.</p>
            </div>
        );
    }
};



const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const history = createMemoryHistory()

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
                AuthService.register(username, email, password).then(
                    () => {
                        setSuccessful(true);
                        setMessage("Register Successful")
                        history.push("/Login")
                    },
                    () => {
                        setMessage("Something went wrong, please try again")
                        setSuccessful(false);
                    }
                );
        }
    };

    return (
        <div className="modal-dialog modal-login">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Register</h4>
                </div>

                <div className="modal-body">
                    <Form onSubmit={handleRegister} ref={form}>
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
                                        validations={[required, vusername]}
                                        data-testid="register-input-username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required, validEmail]}
                                        data-testid="register-input-email"
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
                                        validations={[required, vpassword]}
                                        data-testid="register-input-password"
                                    />
                                </div>

                                <div className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        data-testid="register-button-submit"
                                    >
                                        Sign Up
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
                                <p className="hint-text font-weight-normal"><a href="/Login">Login</a></p>
                            </div>

                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
