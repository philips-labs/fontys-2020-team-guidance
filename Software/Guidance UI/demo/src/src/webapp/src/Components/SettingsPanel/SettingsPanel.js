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

            email: 'artsdylan@gmail.com',
            distance1: 0,
            distance2: 0,
            distance3: 0,
            location: '',
            beacon1: '',
            beacon2: '',
            beacon3: '',

            nodeList: {}
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

        this.getUserData(this.state.email); // Here needs to come the email of the logged in user
    }

    getUserData = (email) => {
        fetch("/api/userdata/getUserDataByEmail/" + email)
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
        this.getUserLocation(this.state.email);
        let partsArray = this.state.location.split(';');
        let userX = partsArray[0];
        let userY = partsArray[1];

        const floorplan = document.getElementById("floorplan-container-image");
        document.getElementById("user").style.left = floorplan.getBoundingClientRect().left + parseInt(userX) + "px"
        document.getElementById("user").style.top = floorplan.getBoundingClientRect().top + parseInt(userY) + "px"
    };


    getUserLocation = (email) => {
        fetch("/api/userdata/getUserLocationByEmail/" + email)
            .then(res => res.text())
            .then(data => {
                if(data != null) {
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
        fetch("/api/floorplan/getFloorplanByBeaconAndSSID/"+closestBeacon+"/"+this.state.ssid)
            .then(res => res.text())
            .then(floorplanid => {
                this.setState({
                    floorplanid: floorplanid
                })

                this.getFloorplanImage(floorplanid);
            })
    }

    getFloorplanImage = (floorplanid) => {
        fetch("/api/floorplan/getFloorplan/"+this.state.ssid+"/"+floorplanid)
            .then(res => res.json())
            .then(imagesrc => {
                if(imagesrc.image) {
                    document.getElementById("floorplan-container-image").src = imagesrc.image;
                    this.getNodes(floorplanid);
                }
                else {
                    this.configureSSID();
                }
            })
    }

    getNodes(floorplanid) {
        fetch("/api/floorplan/getNodes/" + this.state.ssid + "/" + floorplanid)
            .then(res => res.json())
            .then(data => {
                if(data) {
                    this.setState({nodeList: data})
                    this.mapNodes();
                }
            });
    }

    mapNodes() {

        this.state.nodeList.forEach(node => {
            const x = document.getElementById("floorplan-container-image").getBoundingClientRect().left + node.x;
            const y = document.getElementById("floorplan-container-image").getBoundingClientRect().top + node.y;
            if(node.type === "intermediaryNode") {
            }
            else if(node.type === "stairs") {

                document.getElementById("floorplan-container").innerHTML += '<div id="'+node.id+'" style="position:absolute; left: '+x+"px"+'; top: '+y+"px"+'; background-color: yellow; padding: 8px; border-radius: 45px; border: 1px solid white"/>'
            }

            document.getElementById("floorplan-container").innerHTML += '<div id="'+node.id+'" style="position:absolute; left: '+x+"px"+'; top: '+y+"px"+'; background-color: #2166cf; padding: 8px; border-radius: 45px; border: 1px solid white"/>'
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
