import React from 'react';
import './App.css';
import MobileMenu from "./Components/MobileMenu";
import DesktopMenu from "./Components/DesktopMenu";
import Logo from "./Components/Logo";
import SettingsPanel from "./Components/SettingsPanel";

function App() {
  return (
    <div className="App">
        <Logo/>
        <MobileMenu/>
        <DesktopMenu/>
        <SettingsPanel/>
    </div>
  );
}

export default App;
