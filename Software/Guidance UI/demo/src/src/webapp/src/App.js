import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/AdminPage";
import SuperAdminPage from "./Pages/SuperAdminPage";
import FloorplanEditPage from "./Pages/FloorplanEditPage";

function App() {

  return (
      <Router>
          <Switch>
              <Route exact path={"/"} component={MainPage}/>
              <Route exact path={"/admin"} component={AdminPage}/>
              <Route exact path={"/superadmin"} component={SuperAdminPage}/>
              <Route path={"/editfloorplan/:ssid/:floorplanid"} component={FloorplanEditPage}/>
              <Redirect to={"/404"}/>
          </Switch>
      </Router>
  );
}

export default App;
