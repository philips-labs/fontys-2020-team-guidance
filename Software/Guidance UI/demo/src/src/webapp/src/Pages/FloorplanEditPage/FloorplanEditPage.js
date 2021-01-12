import React, {Component} from 'react';
import '../../App.css';
import Draggable from "../../Components/Draggable/Draggable";
import Node from "../../Components/Node/Node";
import IBeacon from "../../Components/IBeacon/IBeacon";
import Linking from "../../Components/Linking/Linking";
import {Link} from "react-router-dom";
import { Line } from 'react-lineto';

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
            nodeToggle: "unlockedNodes",
            presetPaths: [],
            pageLoading: true,
            pathLineCoords: []
        }
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        fetch("/api/floorplan/getFloorplan/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => {
                if(data !== undefined) {
                    this.setState({image: data.image})
                }
            })
            this.fetchNode();


        if(this.state.image === undefined || this.state.image === null || this.state.nodeList === undefined || this.state.nodeList === null || this.state.iBeaconList === undefined || this.state.iBeaconList === null) {
            window.location = "localhost:3000/admin";
        }
    }

    async fetchNode() {
        await fetch("/api/floorplan/getNodes/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({nodeList: data})
                let list = this.state.nodeList;
                let id = 0;
                list.forEach(node => {
                    if (node.id > id) {
                        id = node.id;
                    }
                })
                console.log(list);
                this.setState({nodeList: list, nodeId: id+1});
                this.fetchIBeacon()
            })
    }

    async fetchIBeacon() {
        await fetch("/api/floorplan/getBeacons/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => {
                    let list = data;
                    let id = 0;
                    list.forEach(iBeacon => {
                        if (iBeacon.id > id) {
                            id = iBeacon.id;
                        }
                    })
                console.log(list);
                    this.setState({iBeaconList: list, iBeaconId: id+1});
                    this.fetchPaths();
            })
    }

    async fetchPaths() {
        await fetch("/api/floorplan/getPaths/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => {
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

        this.setupPathLines();
    }

    async setupPathLines() {
        let list = [];

        this.state.presetPaths.forEach(item => {
            console.log("length: " +item.path.length)
            for(let x = 0; x < item.path.length; x++) {
                const node1 = item.path[x];
                const node2 = item.path[x+1];
                let node1Position = null;
                let node2Position = null;

                this.state.nodeList.forEach(node => {
                    if(node.id === node1) {
                        node1Position = [node.x, node.y];
                    }
                })

                this.state.nodeList.forEach(node => {
                    if(node.id === node2) {
                        node2Position = [node.x, node.y];
                    }
                })

                if(node1Position !== null && node2Position !== null) {
                    list.push([node1Position[0], node1Position[1], node2Position[0], node2Position[1], item.color]);

                    this.setState({
                        pathLineCoords: list
                    })
                }
            }
        })

        this.setState({
            pageLoading: false
        });

        console.log(this.state.pathLineCoords)
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

    handleSelector = (e) => {
        this.setState({selectedItem: parseInt(e.target.value)});
    }

    deleteNode = () => {
        const list = this.state.nodeList;
        for(let i = 0; i < list.length; i++) {
            if(list[i].id === this.state.selectedItem){
                console.log(i)
                list.splice(i,1);
            }
        }
        this.setState({nodeList: list});
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
    }

    deleteIBeacon = () => {
        const list = this.state.iBeaconList;
        list.splice(this.state.selectedItem-1,1);
        this.setState({iBeaconList: list});
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
        const itemN = this.state.nodeList;
        const x = childX;
        const y = childY;
        for(let i =0; i<itemN.length; i++){
            if(itemN[i].id === id) {
                itemN[i] = {id, x, y, type};
            }
        }
        this.setState({nodeList: itemN});
        this.setupPathLines();
    }

    onSaveBeacon = (id, childX, childY, type, name) => {
        const itemB = this.state.iBeaconList;
        const x = childX;
        const y = childY;
        for(let i =0; i<itemB.length; i++){
            if(itemB[i].id === id) {
                itemB[i] = {id, x, y, type, name};
            }
        }
        this.setState({iBeaconList: itemB});
    }

    openFileDialog = () => {
        document.getElementById("file-input").click();
    }

    fileInputOnchange = (e) => {
        const reader = new FileReader();

        const file = e.target.files[0];
        reader.readAsDataURL(file);

        reader.onload = this.onLoad(reader);
    }

    onLoad(reader) {
        return () => {
            let result = reader.result;
            this.updateImage(result, this.state.ssid, this.state.floorplanid);
        }
    }

    updateImage(result, ssid, name) {
        if(name && name.length > 0) {
            fetch("/api/floorplan/updateFloorplan/" + this.state.ssid + "/" + this.state.floorplanid, {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    image: result
                })

            })
                .then(floorplans => floorplans.text())
                .then(res => {
                    this.setState({image: res})
                })
        }
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    reloadpage = () => {
        this.fetchPaths();
    }

    // renders the heatmap and draggable nodes
    render() {
        if (this.state.nodeToggle === "lockNodes") {
            return (
                <div className={'FloorplanEditPage'}>
                    <Linking parentCallback={this.reloadpage} nodeList={this.state.nodeList} iBeaconList={this.state.iBeaconList} pathList={this.state.presetPaths} ssid={this.state.ssid} floorplanid={this.state.floorplanid}/>
                    <div>
                        {
                            this.state.pathLineCoords.map(item => {
                                console.log(this.state.pathLineCoords);
                                return (
                                    <Line x0={item[0] + (this.state.width - this.state.imgWidth)/2 + 46.41/2} y0={item[1] + 99 + 46.41/2} x1={item[2] + (this.state.width - this.state.imgWidth)/2 + 46.41/2} y1={item[3] + 99 + 46.41/2} borderColor={item[4]} borderWidth={"3px"} />
                                );
                            })
                        }
                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds " + this.state.nodeToggle} style={{
                            backgroundImage: `url(${this.state.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: `${this.state.imgHeight}px`,
                            width: `${this.state.imgWidth}px`,
                        }}>
                            {
                                this.state.nodeList.map((item) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveNode} id={item.id}
                                               type={item.type} key={item.id} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <Node className={item.id} key={item.id} type={item.type} data={this.state.nodeData}
                                              nodeId={item.id}/>
                                    </Draggable>
                                );
                            })}
                            {this.state.iBeaconList.map((item) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveBeacon} id={item.id} type={item.type} name={item.name}
                                               key={item.id} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
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
        else if(this.state.pageLoading !== true) {
            console.log(this.state.presetPaths);
            return (
                <div className={'App'}>
                    <div className={'FloorplanEdit'}>
                        <Link to={"/"}><img draggable={"false"} alt="" className="Logo MenuLogo" src={require('../../Components/Images/logo.png')}/></Link><br/>
                        <button onClick={this.newNode}>Add Node</button><br/>
                        <input placeholder="ID Node" onChange={this.handleSelector}/><br/>
                        <button className={"red"} onClick={this.deleteNode}>Delete Node</button><br/>
                        <button onClick={this.newIBeacon}>Add IBeacon</button><br/>
                        <input placeholder="ID Beacon" onChange={this.handleSelector}/><br/>
                        <button className={"red"} onClick={this.deleteIBeacon}>Delete IBeacon</button><br/>
                        <button onClick={this.newNode} value="stairs">Add Stairs</button><br/>
                        <button onClick={this.LockNodes}>Lock Nodes</button><br/>
                    </div>
                    <div>
                        {
                            this.state.pathLineCoords.map(item => {
                                console.log(this.state.pathLineCoords);
                                return (
                                    <Line x0={item[0] + (this.state.width - this.state.imgWidth)/2 + 46.41/2} y0={item[1] + 99 + 46.41/2} x1={item[2] + (this.state.width - this.state.imgWidth)/2 + 46.41/2} y1={item[3] + 99 + 46.41/2} borderColor={item[4]} borderWidth={"3px"}/>
                                );
                            })
                        }
                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds "+ this.state.nodeToggle} style={{
                            backgroundImage:  `url(${this.state.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: `${this.state.imgHeight}px`,
                            width: `${this.state.imgWidth}px`,
                        }}>
                            {
                                this.state.nodeList.map((item) => {
                                console.log(item.id);
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveNode} id={item.id}
                                               type={item.type} key={item.id} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <Node className={item.id} key={item.id} type={item.type} data={this.state.nodeData}
                                              nodeId={item.id}/>
                                    </Draggable>

                                );
                            })}
                            {this.state.iBeaconList.map((item) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveBeacon} id={item.id} type={item.type}
                                               name={item.name} key={item.id} boundx={this.state.imgWidth} boundy={this.state.imgHeight}>
                                        <IBeacon/>
                                    </Draggable>
                                );
                            })}
                        </div>
                    </div>
                    <img ref={this.imgRef} src= {this.state.image} alt='gfg' onLoad={this.handleImageLoad} style={{visibility: "hidden"}}/>

                    <input onChange={this.fileInputOnchange} className={"FileInput"} id="file-input" type="file" name="name" accept="image/*" />
                </div>
            );
        }
        else {
            return (
                <p className={"loading"}>loading...</p>
            )
        }
    }
}

export default FloorplanEditPage;
