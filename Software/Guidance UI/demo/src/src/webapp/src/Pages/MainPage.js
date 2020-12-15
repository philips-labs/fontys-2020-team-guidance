import React, {Component} from 'react';
import Logo from "../Components/Logo/Logo";
import MobileMenu from "../Components/MobileMenu/MobileMenu";
import SettingsPanel from "../Components/SettingsPanel/SettingsPanel";
import AccountPanel from "../Components/AccountPanel/AccountPanel";
import Floorplan from "../Components/Floorplan/Floorplan";

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ssid: '',
            floorplanid: ''
        }
    }

    render() {
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
}

export default MainPage;
