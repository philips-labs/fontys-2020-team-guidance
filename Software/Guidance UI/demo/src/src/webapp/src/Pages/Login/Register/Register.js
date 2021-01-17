import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../../services/auth.service";

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



const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

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

    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
                AuthService.register(username, email, password).then(
                    (response) => {
                        props.history.push("/Login");
                        window.location.reload();
                        setSuccessful(true);
                    },
                    (error) => {
                        console.log(error)

                        setMessage(error);
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
                                    <div className="input-group">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required, vusername]}
                                        placeholder="Username"
                                        style={{fontSize: '20px'}}
                                    />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={onChangeEmail}
                                            validations={[required, validEmail]}
                                            placeholder="Email"
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
                                            validations={[required, vpassword]}
                                            placeholder="Password"
                                            style={{fontSize: '20px'}}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={onChangeConfirmPassword}
                                            validations={[required, vpassword]}
                                            placeholder="Confirm Password"
                                            style={{fontSize: '20px'}}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Register</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={ successful ? "alert alert-success" : "alert alert-danger" }
                                    role="alert"
                                >
                                    {message}
                                </div>
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
