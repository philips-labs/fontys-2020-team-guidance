import React, {Component} from 'react';
import '../../App.css';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssid: '',
            InputSSID: '',
            floorplanid: '',
            floorplan: '',

            email: '',
            distance1: 0,
            distance2: 0,
            distance3: 0,
            location: '',
            beacon1: '',
            beacon2: '',
            beacon3: ''
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
                ssid: this.state.InputSSID
            })

            alert("Network name updated to: " + this.state.InputSSID);
            this.getFloorplans(this.state.InputSSID)
        }
    }

    componentDidMount() {
        this.configureSSID();
    }

    configureSSID() {
        const ssid = prompt("Please enter the network name", "Network Name");

        this.setState({
            ssid: ssid,
            InputSSID: ssid
        });

        this.getFloorplans(ssid);
        this.getUserData("artsdylan@gmail.com"); // Here needs to come the email of the logged in user
    }


    getFloorplans(string) {
        fetch("/books/getFloorplanBySSID/" + string)
            .then(res => res.text())
            .then(imagesrc => {
                if(imagesrc !== null) {
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
                        location: data.location,
                        beacon1: data.beacon1,
                        beacon2: data.beacon2,
                        beacon3: data.beacon3
                    });

                    this.checkClosestBeacon(this.state.distance1, this.state.distance2, this.state.distance3, this.state.beacon1, this.state.beacon2, this.state.beacon3);
                }
            }).catch((error) => {
            console.error("Error - " + error)
            });

        const interval = setInterval(this.showUserLocation, 3000)
    };

    showUserLocation = () => {
        console.log("interval");
        this.getUserLocation("yessin1996@hotmail.com");
        let partsArray = this.state.location.split(';');
        let userX = partsArray[0];
        let userY = partsArray[1];
    };


    getUserLocation = (email) => {
        fetch("/books/getUserLocationByEmail/" + email)
            .then(res => res.text())
            .then(data => {
                if(data != null) {
                    console.log(data);
                    this.setState({
                        location: data
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error)
        });
    };

    checkClosestBeacon = (d1, d2, d3, b1, b2, b3) => {
        if(d1 < d2 && d1 < d3) {
            this.getFloorplan(b1);
        }
        else if(d2 < d1 && d2 < d3) {
            this.getFloorplan(b2);
        }
        else {
            this.getFloorplan(b3);
        }
    }

    getFloorplan = (closestBeacon) => {
        fetch("/books/getFloorplanByBeaconAndSSID/"+closestBeacon+"/"+this.state.ssid+"")
            .then(res => res.text())
            .then(ssid => {
                this.setState({
                    ssid: ssid
                })
            })

        fetch("/books/getFloorplan/"+this.state.ssid+"/"+this.state.floorplanid+"")
            .then(res => res.text())
            .then(imagesrc => {
                if(imagesrc) {
                    document.getElementById("floorplan-container-image").src = imagesrc;
                }
                else {
                    this.configureSSID();
                }
            })
    }


    render() {
        const {location} = this.state;
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
