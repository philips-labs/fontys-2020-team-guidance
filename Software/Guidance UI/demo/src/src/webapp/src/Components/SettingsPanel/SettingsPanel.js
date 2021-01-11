import React, {Component} from 'react';
import '../../App.css';
import AuthService from "../../services/auth.service";

class SettingsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssid: '',
            InputSSID: '',
            floorplanid: '',
            floorplan: '',
            users: '',
            email: '',
            distance1: 0,
            distance2: 0,
            distance3: 0,
            location: '',
            cacheLocation: [],
            beacon1: '',
            beacon2: '',
            beacon3: '',
            isLoaded: false,
            nodeList: []
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
        this.setState({isLoaded: true})

        const user = AuthService.getCurrentUser();
        this.setState({
            email: user.email
        })
        this.configureSSID(user)
    }

    configureSSID(user) {
        const ssid = prompt("Please enter the network name", "Network Name");

        if(user.email !== "null") {
            this.setState({
                ssid: ssid,
                InputSSID: ssid,
                email: user.email
            });
        }
        this.getUserData(user.email)
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
            })
        setInterval(this.showUserLocation, 3000)
    };

    showUserLocation = () => {
        this.getUserLocation();
        let partsArray = this.state.location.split(';');
        let userX = partsArray[0];
        let userY = partsArray[1];

        const floorplan = document.getElementById("floorplan-container-image");
        document.getElementById("user").style.left = floorplan.getBoundingClientRect().left + parseInt(userX) + "px"
        document.getElementById("user").style.top = floorplan.getBoundingClientRect().top + parseInt(userY) + "px"

        if(this.state.location.split) {
            this.getClosesNode();
        }
    };


    async getUserLocation() {
        await fetch("/api/userdata/getUserLocationByEmail/" + this.state.email)
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

    async getFloorplanImage(floorplanid) {
        await fetch("/api/floorplan/getFloorplan/"+this.state.ssid+"/"+floorplanid)
            .then(res => res.json())
            .then(imagesrc => {
                document.getElementById("floorplan-container-image").src = imagesrc.image;
                this.getNodes(floorplanid);
            })
            .catch(e => {
                console.error("There was a problem getting the floorplan: " + e);
                this.configureSSID();
            })

    }

    async getNodes(floorplanid) {
        await fetch("/api/floorplan/getNodes/" + this.state.ssid + "/" + floorplanid)
            .then(res => res.json())
            .then(data => {
                if(data) {
                    this.setState({nodeList: data})
                    this.mapNodes();
                }
            });
    }

    getClosesNode = () => {
        this.getUserLocation();
        if(this.state.location !== "location") {
            const userLocation = this.state.location.split(';');
            let distanceList = [];

            this.state.nodeList.forEach(item => {
                distanceList.push([item.id, this.pythagoras(item.x, item.y, userLocation[0], userLocation[1])])
            })

            let closestNode = [];

            distanceList.forEach(item => {
                console.log(closestNode[1] + item[1])
                if(closestNode[1] > item[1]) {
                    closestNode = [item[0], item[1]];
                }
                else if(!closestNode[1]) {
                    closestNode = [item[0], item[1]];
                }
            })

            fetch("/api/userdata/updateClosestNode/" + closestNode[0] + "/" + this.state.floorplanid + "/" + this.state.ssid + "/" + this.state.email, {
                method: 'put'
            })
        }
    }

    pythagoras = (x1, y1, x2, y2) => {
        var xDiff = x1 - x2;
        var yDiff = y1 - y2;

        if (xDiff < 0) {
            xDiff = xDiff * -1;
        }
        if (yDiff < 0) {
            yDiff = yDiff * -1;
        }

        return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }

    mapNodes() {

        this.state.nodeList.forEach(node => {
            const x = document.getElementById("floorplan-container-image").getBoundingClientRect().left + node.x;
            const y = document.getElementById("floorplan-container-image").getBoundingClientRect().top + node.y;

            if(node.type === "stairs") {
                document.getElementById("floorplan-container").innerHTML += '<div class="stairMainpage" id="'+node.id+'" style="position:absolute; left: '+x+"px"+'; top: '+y+"px"+';"/>' // eslint-disable-line
            }
            else {
                document.getElementById("floorplan-container").innerHTML += '<div class="nodeMainpage" id="'+node.id+'" style="position:absolute; left: '+x+"px"+'; top: '+y+"px"+';"/>' // eslint-disable-line
            }

        })
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
