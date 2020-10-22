import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class MobileMenu extends Component {

    render() {
        return (
            <div className="mobileMenu">
                <img alt="" className="PFImage" src={require('./Images/logo.png')}/>
                <img alt="" id="settingsButton" className="SettingsImage" src={require('./Images/gear.png')}/>
                <img alt="" id="accountButton" src={require('./Images/pf.png')}/>
            </div>
        );
    }
}

export default MobileMenu;
