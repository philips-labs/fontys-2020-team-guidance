import React from 'react';
import Logo from "../Components/Logo";
import MobileMenu from "../Components/MobileMenu";
import SettingsPanel from "../Components/SettingsPanel";
import AccountPanel from "../Components/AccountPanel";
import Floorplan from "../Components/Floorplan";

function MainPage() {

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

export default MainPage;
