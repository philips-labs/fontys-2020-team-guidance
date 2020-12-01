import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SSID: '',
            InputSSID: '',
            floorplan: ''
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
        this.configureSSID()
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

    postFloorplans(String) {
        fetch("/books", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: 101,
                title: String,
                author: "John Carnell",
                coverPhotoURL: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
                isbnNumber: 1617293989,
                price: 2776,
                language: "English"
            })
        })
            .then(data => data.json())
    }


    render() {
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
