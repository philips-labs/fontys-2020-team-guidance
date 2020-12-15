import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/AdminPage";
import SuperAdminPage from "./Pages/SuperAdminPage";
import FloorplanEditPage from "./Pages/FloorplanEditPage";
import NotFoundPage from "./Pages/404";
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Login/Register';
import Profile from './Pages/Login/Profile';
import ForgotPassword from './Pages/Login/ForgotPassword';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={MainPage}/>
                <Route exact path={"/admin"} component={AdminPage}/>
                <Route exact path={"/superadmin"} component={SuperAdminPage}/>
                <Route path={"/editfloorplan/:ssid/:floorplanid"} component={FloorplanEditPage}/>
                <Route path={"/Login"} component={LoginPage}/>
                <Route path={"/Register"} component={RegisterPage}/>
                <Route path={"/Profile"} component={Profile}/>
                <Route path={"/ForgotPassword"} component={ForgotPassword}/>
                <Route exact path={"/404"} component={NotFoundPage}/>
                <Redirect to={"/404"}/>
            </Switch>
        </Router>
    );
}

export default App;
