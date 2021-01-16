import React, {Component} from 'react';
import '../../App.css';
import AuthService from "../../services/auth.service";
import {Line} from "react-lineto";

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
            nodeList: [],
            presetPaths: [],
            pathLineCoords: [],
            imageOffsetX: 0,
            imageOffsetY: 0,
            chosenPath: [],
            loading: true
        }

        this.getLeastPopPath = this.getLeastPopPath.bind(this);
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

            this.getUserData(user.email)
        }
        else {
            window.location.reload();
        }
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
        setInterval(this.showUserLocation, 6000)
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

            fetch("/api/userdata/updateClosestNode/" + closestNode[0] + "/" + this.state.email + "/" + this.state.floorplanid + "/" + this.state.ssid)
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

        this.fetchPaths();
    }

    async fetchPaths() {
        await fetch("/api/floorplan/getPaths/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const list = data;
                list.forEach(presetPath => {
                    presetPath.path = presetPath.path.split(',');
                    for(let i = 0; i < presetPath.path.length; i++) {
                        presetPath.path[i] = parseInt(presetPath.path[i]);
                    }
                })

                this.setState({
                    presetPaths: list
                });
            })

        this.setState({loading: false})
    }

    async getLeastPopPath() {
        let path;

        await fetch("/api/floorplan/getPathfinding/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => {
                console.log(path);
                path = data;
                this.handlePickPath(path);
            })
    }

    handlePickPath = (path) => {
        this.state.presetPaths.forEach(item => {
            if(item.name === path.name) {
                console.log(item);
                this.setupPathLines(item);
            }
        })
    }

    setupPathLines = (item) => {
        let list = [];

        this.setState({
            imageOffsetX: document.getElementById("floorplan-container-image").offsetLeft + 40,
            imageOffsetY: document.getElementById("floorplan-container-image").offsetTop + 55
        })

        console.log(this.state.chosenPath);

            for (let x = 0; x < item.path.length; x++) {
                const node1 = item.path[x];
                const node2 = item.path[x + 1];
                let node1Position = null;
                let node2Position = null;

                this.state.nodeList.forEach(node => {
                    if (node.id === node1) {
                        node1Position = [node.x, node.y];
                    }
                })

                this.state.nodeList.forEach(node => {
                    if (node.id === node2) {
                        node2Position = [node.x, node.y];
                    }
                })

                if (node1Position !== null && node2Position !== null) {
                    list.push([node1Position[0], node1Position[1], node2Position[0], node2Position[1], item.color]);

                    this.setState({
                        pathLineCoords: list
                    })
                }
            }
    }

    render() {
        if(this.state.loading) {
            return (
                <div className={"mainLoading"}>
                    <p className={"loading"}>loading...</p>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button className={"testPath"} onClick={this.getLeastPopPath}>Get safe path</button>
                    <div id="settingsPanel" className="settingsPanel">
                        <p className="settingsHeader">Settings</p>
                        <div className="divider"/>
                        <div className="settingObject">
                            <p className="settingName">Network name</p>
                            <input onKeyDown={this.handleInputSubmit} onChange={this.handleInputChange} className="ssidInput" value={this.state.InputSSID}/>
                        </div>

                        {
                            this.state.pathLineCoords.map((item, key) => {
                                return (
                                    <Line key={key} x0={item[0] + this.state.imageOffsetX} y0={item[1] + this.state.imageOffsetY} x1={item[2] + this.state.imageOffsetX} y1={item[3] + this.state.imageOffsetY} borderColor={item[4]} borderWidth={"3px"} />
                                );
                            })
                        }
                    </div>
                </div>
            );
        }
    }
}

export default SettingsPanel;
