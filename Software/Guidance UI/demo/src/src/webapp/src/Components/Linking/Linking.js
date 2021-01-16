import React, {Component} from 'react'
import {Link} from "react-router-dom";
import SaveImage from "../Images/check.png";
import DeleteImage from "../Images/delete.png";
import EditImage from "../Images/edit.png";

export default class Linking extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            input: 0,
            nodeList: this.props.nodeList,
            iBeaconList: this.props.iBeaconList,
            count: 0,
            selectedNode: 0,
            distance: 0,
            ssid: this.props.ssid,
            floorplanid: this.props.floorplanid,
            presetPaths: this.props.pathList,
            tempPathName: '',
            editingIndex: null,
            pathColor: "#ff0000"
        };
    }

    render() {
        return (
            <div className={"linkMenu"}>
                <div>
                    <Link to={"/"}><img draggable={"false"} alt="" className="Logo MenuLogo" src={require('../Images/logo.png')}/></Link><br/>

                    <p className={"pathsTitle"}>Preset paths</p>
                    <div className={"pathList"}>
                        <div>
                            {
                                this.state.presetPaths.map((i, key) => {
                                    return (
                                        <div key={key} className={"pathButton"}>
                                            <input value={i.color} className={"pathColorInput menuColor"} type={"color"} disabled/>
                                            <p className={"pathTitle"}>{i.name}</p>
                                            <button className={"invisBtn"} onClick={this.editPath} value={key}><img className={"manageButton"} alt={i.name} src={EditImage}/></button>
                                            <button className={"invisBtn"} onClick={this.deletePath} value={key}><img className={"manageButton"} alt={i.name} src={DeleteImage}/></button>
                                        </div>
                                    )
                                })
                            }
                            <div id={"addPathInput"} className={"pathButton addInput"}>
                                <input value={this.state.pathColor} className={"pathColorInput"} type={"color"} onChange={this.handlePathColor}/>
                                <input onChange={this.handleTempPresetPathName} value={this.state.tempPathName} className={"addPathInput"} maxLength={"8"}/>
                                <img onClick={this.savePresetPath} className={"pathAddSaveBtn"} alt={""} src={SaveImage}/>
                            </div>
                            <p id={"addNewBtn"} onClick={this.unlockAddPathInput} className={"addPathText"}>+</p>
                        </div>
                    </div>

                    <div id={"nodeLinkContainer"} className={"nodeLinkContainer"}>
                        <p className={"NodeSaveTtl"}>Node Linker</p><br/>
                        <input placeholder="ID node" onChange={this.handleSelector}/><br/>
                        <label>Destination Node</label>
                        <input className={"CheckBox"} type="checkbox" id="destinationNode" name="destinationNode" onChange={this.handleCheck}/><br/>
                        <button onClick={this.saveLinks}>Add Node</button><br/><br/>
                        <button onClick={this.deleteLinks}>Delete Node</button><br/><br/>
                        <button className={"green"} onClick={this.saveNodes}>Save</button><br/>
                    </div>
                </div>
                {/* <div>
                    <p>Path Finder</p>
                    <input placeholder={"starting node"} onChange={this.handleStart}></input>
                    <input placeholder={"ending node"} onChange={this.handleEnd}></input>
                    <p>{this.state.result}</p>
                    <button onClick={this.calculatePath}>Find Path</button>
                </div> */}
            </div>
        );
    }

    handlePathColor = (e) => {
        this.setState({pathColor: e.target.value})
    }

    editPath = (e) => {
        this.setState({
            editingIndex: e.target.alt
        })

        const container = document.getElementById("nodeLinkContainer");
        container.style.pointerEvents = "auto";
        container.style.opacity = "1";
    }

    deletePath = (e) => {
        const newList = this.state.presetPaths;

        for(let x = 0; x < this.state.presetPaths.length; x++) {
            if(this.state.presetPaths[x].name === e.target.alt) {
                newList.splice(x, 1);
            }
        }

        this.setState({
            presetPaths: newList
        })

        fetch("/api/floorplan/deletePath/"+this.state.ssid+"/"+this.state.floorplanid+"/"+ e.target.alt, {
            method: 'delete'
        })

        this.props.parentCallback();
    }

    unlockAddPathInput = () => {
        document.getElementById("addPathInput").style.display = "inline";
    }

    savePresetPath = () => {
        let namePresent = false;
        this.state.presetPaths.forEach(item => {
            if(item.name === this.state.tempPathName) {
                namePresent = true;
            }
        })

        if(!namePresent && this.state.tempPathName.length > 0) {
            const newList = this.state.presetPaths.concat({name: this.state.tempPathName, path: [], color: this.state.pathColor});

            this.setState({
                tempPathName: '',
                presetPaths: newList
            })

            document.getElementById("addPathInput").style.display = "none";
        }
        else alert("Something is wrong with the entry, check the name");
    }

    handleTempPresetPathName = (e) => {
        this.setState({
            tempPathName: e.target.value
        })
    }

    saveNodes = () => {
        const container = document.getElementById("nodeLinkContainer");
        container.style.pointerEvents = "none";
        container.style.opacity = ".2";

        this.state.nodeList.forEach(item =>  {
            fetch("/api/floorplan/saveNode", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },

                body: JSON.stringify({
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    type: item.type,
                    ssid: this.state.ssid,
                    floorplanid: this.state.floorplanid
                })
            })
        })

        this.state.iBeaconList.forEach(item => {
            fetch("/api/floorplan/saveBeacon", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    type: item.type,
                    ssid: this.state.ssid,
                    floorplanid: this.state.floorplanid,
                    name: item.name
                })
            })
        })

        this.state.presetPaths.forEach(item => {
            fetch("/api/floorplan/createPath", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    name: item.name,
                    path: item.path.toString(),
                    ssid: this.state.ssid,
                    floorplan: this.state.floorplanid,
                    color: item.color
                })
            })
        })

        this.props.parentCallback();
    }

    handleStart = (e) => {
        this.setState({startingNode: e.target.value});
    }

    handleEnd = (e) => {
        this.setState({endingNode: e.target.value});
    }

    handleCheck = (e) => {
        let list = this.state.nodeList;
        if (e.target.checked === true)
        {
            for(let i = 0; i < list.length; i++) {
                if(this.state.selectedNode === list[i].id) {
                    list[i].type = "destinationNode"
                }
            }
        }
        else {
            for(let i = 0; i < list.length; i++) {
                if(this.state.selectedNode === list[i].id) {
                    list[i].type = "intermediaryNode"
                }
            }
        }
    }
    
    handleSelector = (e) => {
        this.setState({selectedNode: parseInt(e.target.value)});
    }

    saveLinks = () => {
        const list = this.state.presetPaths
        for (let i =0; i < list.length; i++) {
            if(list[i].name === this.state.editingIndex) {
                if (list[i].path.length === 0) {
                    list[i].path.push(this.state.selectedNode);
                }
                else {
                    if(list[i].path.includes(this.state.selectedNode) !== true) {
                        list[i].path.push(this.state.selectedNode);
                    }
                    else {
                        alert("your mom gay");
                    }
                }
            }
        }
        this.setState({presetPaths: list});
    }

    deleteLinks = () => {
        let list = this.state.presetPaths

        list.forEach(item => {
            if(item.name === this.state.editingIndex) {
                item.path.splice(item.path.indexOf(this.state.selectedNode), 1);
            }
        })

        this.setState({presetPaths: list});
    }

    calculateDistance = (nodeOne, nodeTwo) => {
        var node1 = this.state.nodeList[nodeOne];
        var node2 = this.state.nodeList[nodeTwo];
        var xDiff = node1.x - node2.x;
        var yDiff = node1.y - node2.y;

        if (xDiff < 0) {
            xDiff = xDiff * -1;
        }
        if (yDiff < 0) {
            yDiff = yDiff * -1;
        }
        return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }
/*
    calculatePath = () => {
        var start = this.state.startingNode;
        //var end = this.state.endingNode;
        const paths = this.state.nodeList;
        var lastIntersection;
        var currentPath = [];
        var br = false;

        console.log(paths[start].nodeConnections);


        while (br === false) {
            paths[start].nodeConnections.forEach(node => {
                if (paths[node.value].nodeConnections ===! undefined) {
                    for (let i = 0; i < paths[i].nodeConnections.length; i++) {
                        if(paths[i].nodeConnections ===! undefined) {
                            lastIntersection.push();


                        }
                    }
                }
            })
        }
    }*/
}
