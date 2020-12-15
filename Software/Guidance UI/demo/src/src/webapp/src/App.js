import React, {useEffect, useState} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import AuthService from "./services/auth.service";

import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/AdminPage";
import SuperAdminPage from "./Pages/SuperAdminPage";
import FloorplanEditPage from "./Pages/FloorplanEditPage";
import NotFoundPage from "./Pages/404";
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Login/Register';
import Profile from './Pages/Login/Profile';

function App() {

    const[showModeratorBoard, setShowModeratorBoard] = useState(false)
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

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
              <Route exact path={"/404"} component={NotFoundPage}/>
              <Redirect to={"/404"}/>
          </Switch>
      </Router>
  );
}

export default App;
