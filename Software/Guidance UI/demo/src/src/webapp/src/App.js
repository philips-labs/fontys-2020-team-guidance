import React from 'react';
import './App.css';
import MobileMenu from "./Components/MobileMenu";
import Logo from "./Components/Logo";
import SettingsPanel from "./Components/SettingsPanel";
import AccountPanel from "./Components/AccountPanel";
import Floorplan from "./Components/Floorplan";

function App() {

  return (
    <div className="App">
        <Logo/>
        <MobileMenu/>
        <SettingsPanel/>
        <AccountPanel/>
        <Floorplan/>
    </div>
  );
}

export default App;
