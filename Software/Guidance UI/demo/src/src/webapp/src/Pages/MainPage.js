import React from 'react';
import Logo from "../Components/Logo/Logo";
import MobileMenu from "../Components/MobileMenu/MobileMenu";
import SettingsPanel from "../Components/SettingsPanel/SettingsPanel";
import AccountPanel from "../Components/AccountPanel/AccountPanel";
import Floorplan from "../Components/Floorplan/Floorplan";

function MainPage() {

    return (
        <div className="MainPage">
            <Logo/>
            <MobileMenu/>
            <SettingsPanel/>
            <AccountPanel/>
            <Floorplan/>
        </div>
    );
}

export default MainPage;
