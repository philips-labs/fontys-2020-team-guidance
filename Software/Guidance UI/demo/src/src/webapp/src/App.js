import React from 'react';
import './App.css';
import MobileMenu from "./Components/MobileMenu";
import DesktopMenu from "./Components/DesktopMenu";

function App() {
  return (
    <div className="App">
        <MobileMenu/>
        <DesktopMenu/>
    </div>
  );
}

export default App;
