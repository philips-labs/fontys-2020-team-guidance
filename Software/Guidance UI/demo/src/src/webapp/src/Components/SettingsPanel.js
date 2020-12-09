import React, {Component} from 'react';
import './../App.css';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SSID: '',
            InputSSID: '',
            floorplan: '',

            email: '',
            distance1: '',
            distance2: '',
            distance3: '',
            location: ''
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
            this.getFloorplans(this.state.InputSSID)
        }
    }

    componentDidMount() {
        this.configureSSID();
        this.getUserData("yessin1996@hotmail.com"); // Here needs to come the email of the logged in user
    }

    configureSSID() {
        const ssid = prompt("Please enter the network name", "Network Name");

        this.setState({
            SSID: ssid,
            InputSSID: ssid
        });

        this.getFloorplans(ssid);
    }


    getFloorplans(string) {
        fetch("/books/getFloorplanBySSID/" + string)
            .then(res => res.text())
            .then(imagesrc => {
                if(imagesrc !== "null") {
                    document.getElementById("floorplan-container-image").src = imagesrc;
                }
                else {
                    alert("Sorry we couldn't find that SSID can you enter one again?");
                    this.configureSSID()
                }
            })
    }

    getUserData = (email) => {
        fetch("/books/getUserDataByEmail/" + email)
            .then(res => res.json())
            .then(data => {
                if(data != null) {
                    this.setState({
                        email: data.email,
                        distance1: data.distance1,
                        distance2: data.distance2,
                        distance3: data.distance3,
                        location: data.location
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error)
            });
    };


    render() {
        const {email, distance1, distance2, distance3, location} = this.state;
        return (
            <div id="settingsPanel" className="settingsPanel">
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
