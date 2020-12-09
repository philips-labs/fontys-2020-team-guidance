import React, {Component} from 'react';
import './../App.css';
import Draggable from "../Components/Draggable";
import Node from "../Components/Node";
import IBeacon from "../Components/IBeacon";
import Linking from "../Components/Linking";
import Waypoint from '../Components/Images/waypoint.png';
import {Link} from "react-router-dom";

class FloorplanEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssid: this.props.match.params.ssid,
            floorplanid: this.props.match.params.floorplanid,
            image: '',
            nodeList: [],
            iBeaconList: [],
            nodeId: 0,
            iBeaconId: 0,
            x: 0,
            y: 0,
            nodeToggle: "unlockedNodes",
        }
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        fetch("/books/getFloorplan/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => this.setState({image: data.image}))

        fetch("/books/getNodes/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => this.setState({nodeList: data}))
    }


    handleImageLoad = () =>{
        const height = this.imgRef.current.clientHeight;
        const width = this.imgRef.current.clientWidth;
        this.setState({imgHeight: height, imgWidth: width})
    }

    // creating a new node and adding it to the array save
    newNode = (e) => {
        const item = this.state.nodeList;
        const id = this.state.nodeId;
        const x = 0;
        const y = 0;
        let type = "intermediaryNode";
        if (e.target.value === "start")
        {
            type = e.target.value;
        }
        else if (e.target.value === "end")
        {
            type = e.target.value;
        }
        else if (e.target.value === "stairs")
        {
            type = e.target.value;
        }

        item.push({id, x, y, type});
        this.setState({nodeList: item});
        this.setState({nodeId: id + 1})
    }

    // creating a new iBeacon and adding it to the iBeacon list
    newIBeacon = () => {
        const item = this.state.iBeaconList;
        const id = this.state.iBeaconId;
        const x = 0;
        const y = 0;
        const type = "iBeacon";
        const name = prompt("Please fill in the iBeacon name: ", "Beacon Name");

        item.push({id, x, y, type, name});
        this.setState({iBeaconList: item});
        this.setState({iBeaconId: id + 1});
        console.log(this.state.iBeaconList);
    }

    LockNodes = () => {
        if (this.state.nodeToggle === "unlockedNodes")
        {
            this.setState({nodeToggle: "lockNodes"})
        }
        else {
            this.setState({nodeToggle: "unlockedNodes"})
        }
    }

    // doesnt do what it says it just recieves data from the child component and sets it to the correct node in the array
    onSaveNode = (id, childX, childY, type) => {
        this.setState({x: childX, y: childY})

        const item = this.state.nodeList;
        const x = this.state.x;
        const y = this.state.y;
        item[id] = {id, x, y, type};
    }

    onSaveBeacon = (id, childX, childY, type) => {
        this.setState({x: childX, y: childY})

        const item = this.state.iBeaconList;
        const x = this.state.x;
        const y = this.state.y;
        item[id] = {id, x, y, type};
    }

    // check if a start node exists
    checkStart = () => {
        let exists = false;
        for (let i = 0; i < this.state.nodeList.length; i++)
        {
            if (this.state.nodeList[i].type === "start")
            {
                exists = true;
                break;
            }
            else {
                exists = false;
            }
        }
        if (exists === false) {
            return (<button onClick={this.newNode} value="start">Add Start Point</button>)
        }
        else {
            return null;
        }
    }
    // check if a end node exists
    checkEnd = () => {
        let exists = false;
        for (let i = 0; i < this.state.nodeList.length; i++)
        {
            if (this.state.nodeList[i].type === "end")
            {
                exists = true;
                break;
            }
            else {
                exists = false;
            }
        }
        if (exists === false) {
            return (<button onClick={this.newNode} value="end">Add End Point</button>)
        }
        else {
            return null;
        }
    }

    // renders the heatmap and draggable nodes
    render() {
        console.log(this.state.image.height);
        if (this.state.nodeToggle === "lockNodes") {
            return (
                <div className={'App'}>
                    <Linking nodeList={this.state.nodeList} iBeaconList={this.state.iBeaconList} ssid={this.state.ssid} floorplanid={this.state.floorplanid}/>
                    <div>
                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds " + this.state.nodeToggle} style={{
                            backgroundImage: `url(${this.state.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: `${this.state.imgHeight}px`,
                            width: `${this.state.imgWidth}px`,
                        }}>
                            {
                                this.state.nodeList.map((item, key) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveNode} id={key}
                                               type={item.type} key={key} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <Node className={key} key={key} type={item.type} data={this.state.nodeData}
                                              nodeId={key}/>
                                    </Draggable>
                                );
                            })}
                            {this.state.iBeaconList.map((item, key) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveBeacon} id={key}
                                               key={key} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <IBeacon/>
                                    </Draggable>
                                );
                            })}
                        </div>
                    </div>
                    <img ref={this.imgRef} src= {this.state.image} alt='gfg' onLoad={this.handleImageLoad} style={{visibility: "hidden"}}/>
                </div>
            );

        } else {
            return (
                <div className={'App'}>
                    <div className={'FloorplanEdit'}>
                        <Link to={"/"}><img draggable={"false"} alt="" className="Logo MenuLogo" src={require('../Components/Images/logo.png')}/></Link><br/>
                        <button onClick={this.newNode}>Add Node</button><br/>
                        <button onClick={this.newNode} value="stairs">Add Stairs</button><br/>
                        <button onClick={this.newIBeacon}>Add IBeacon</button><br/>
                        <this.checkStart/><br/>
                        <this.checkEnd/><br/>
                        <button onClick={this.LockNodes}>Lock Nodes</button><br/>
                    </div>
                    <div>
                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds "+ this.state.nodeToggle} style={{
                            backgroundImage:  `url(${this.state.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: `${this.state.imgHeight}px`,
                            width: `${this.state.imgWidth}px`,
                        }}>
                            {this.state.nodeList.map((item, key) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveNode} id={key}
                                               type={item.type} key={key} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <Node className={key} key={key} type={item.type} data={this.state.nodeData}
                                              nodeId={key}/>
                                    </Draggable>

                                );
                            })}
                            {this.state.iBeaconList.map((item, key) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveBeacon} id={key}
                                               key={key} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <IBeacon/>
                                    </Draggable>
                                );
                            })}
                        </div>
                    </div>
                    <img ref={this.imgRef} src= {this.state.image} alt='gfg' onLoad={this.handleImageLoad} style={{visibility: "hidden"}}/>
                </div>
            );
        }
    }
}

export default FloorplanEditPage;
