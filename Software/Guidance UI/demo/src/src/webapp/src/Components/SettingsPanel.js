import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SSID: '',
            InputSSID: ''
        }
    }

    handleInputChange = (e) => {
        e.preventDefault()
        this.setState({
            InputSSID: e.target.value
        })
    }

    handleInputSubmit = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            this.setState({
                SSID: this.state.InputSSID
            })

            alert("Network name updated to: " + this.state.InputSSID);
        }
    }

    componentDidMount() {
        const ssid = prompt("Please enter the network name", "Network Name");

        this.setState({
            SSID: ssid,
            InputSSID: ssid
        })
    }


    render() {
        return (
            <div onLoad={this.askSSID} id="settingsPanel" className="settingsPanel">
                <p className="settingsHeader">Settings</p>
                <div className="divider"/>
                <div className="settingObject">
                    <p className="settingName">Network name</p>
                    <input onKeyDown={this.handleInputSubmit} onChange={this.handleInputChange} className="ssidInput" value={this.state.InputSSID}/>
                </div>
                <div className="settingObject">
                    <p className="settingName">Primary Device</p>
                    <input className="checkbox" type="checkbox"/>
                </div>
            </div>
        );
    }
}

export default SettingsPanel;
