import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class MobileMenu extends Component {

    settingsMenu() {
        const settingsPanel = document.getElementById("settingsPanel");

        if(settingsPanel.style.display === "none" || settingsPanel.style.display === "") {
            document.getElementById("accountPanel").style.display = "none";
            document.getElementById("settingsPanel").style.display = "initial";
        }
        else {
            document.getElementById("settingsPanel").style.display = "none";
        }
    }

    accountMenu() {
        const settingsPanel = document.getElementById("accountPanel");

        if(settingsPanel.style.display === "none" || settingsPanel.style.display === "") {
            document.getElementById("settingsPanel").style.display = "none";
            document.getElementById("accountPanel").style.display = "initial";
        }
        else {
            document.getElementById("accountPanel").style.display = "none";
        }
    }

    render() {
        return (
            <div className="Menu">
                <img onClick={this.accountMenu} alt="" id="accountButton" className="AccountImage" src={require('./Images/pf.png')}/>
                <img onClick={this.settingsMenu} alt="" id="settingsButton" className="SettingsImage" src={require('./Images/gear.png')}/>
            </div>
        );
    }
}

export default MobileMenu;
