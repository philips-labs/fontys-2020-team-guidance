import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class MobileMenu extends Component {

    render() {
        return (
            <div className="mobileMenu">
                <img alt="" id="accountButton" className="MobileAccountImage" src={require('./Images/pf.png')}/>
                <img alt="" id="settingsButton" src={require('./Images/gear.png')}/>
            </div>
        );
    }
}

export default MobileMenu;
