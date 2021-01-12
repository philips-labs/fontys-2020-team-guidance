import React, {useEffect, useState} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import MainPage from "./Pages/MainPage/MainPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import SuperAdminPage from "./Pages/SuperAdminPage/SuperAdminPage";
import FloorplanEditPage from "./Pages/FloorplanEditPage/FloorplanEditPage";
import NotFoundPage from "./Pages/404/404";
import LoginPage from './Pages/Login/Login/Login';
import RegisterPage from './Pages/Login/Register/Register';
import Profile from './Pages/Login/Profile/Profile';
import ForgotPassword from './Pages/Login/ForgotPassword/ForgotPassword';
import AuthService from './services/auth.service'



function App() {

    const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowSuperAdminBoard(user.roles.includes("ROLE_SUPER_ADMIN"));
        }
    }, []);

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path={"/home"} component={MainPage}/>

                    {showAdminBoard ? (
                        <Route exact path={"/admin"} component={AdminPage}/>
                    ) : (
                        <Route exact path={"/admin"} component={NotFoundPage}/>
                    )}

                    {showAdminBoard ? (
                        <Route path={"/editfloorplan/:ssid/:floorplanid"} component={FloorplanEditPage}/>
                    ) : (
                        <Route exact path={"/editfloorplan/:ssid/:floorplanid"} component={NotFoundPage}/>
                    )}

                    {showSuperAdminBoard ? (
                        <Route exact path={"/superadmin"} component={SuperAdminPage}/>
                    ) : (
                        <Route exact path={"/superadmin"} component={NotFoundPage}/>
                    )}

                    <Route path={"/Register"} component={RegisterPage}/>
                    <Route path={"/Profile"} component={Profile}/>
                    <Route path={"/ForgotPassword"} component={ForgotPassword}/>
                    <Route path={["/Login", "/"]} component={LoginPage}/>
                    <Route exact path={"/404"} component={NotFoundPage}/>
                    <Redirect to={"/404"}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
