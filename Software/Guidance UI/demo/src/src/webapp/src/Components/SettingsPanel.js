import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class SettingsPanel extends Component {

    render() {
        return (
            <div id="settingsPanel" className="settingsPanel">
                <p className="settingsHeader">Settings</p>
                <div className="divider"/>
                <div className="settingObject">
                    <p className="settingName">Primary Device</p>
                    <input className="checkbox" type="checkbox"/>
                </div>
            </div>
        );
    }
}

export default SettingsPanel;
