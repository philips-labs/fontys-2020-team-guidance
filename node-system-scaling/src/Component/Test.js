import React, {Component} from 'react';
import LineTo from 'react-lineto';
import Node from './Node.js';
import IBeacon from './IBeacon';
import Draggable from './Draggable.js';
import Linking from './Linking.js';
import DemoMap from './Images/background.png';
import DemoMap1 from './Images/floorplan.png';
import data from "../Media/media.json";
import './Node.css';
import '../App.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeList: [],
            iBeaconList: [],
            nodeId: 0,
            iBeaconId: 0,
            nodeData: data,
            x: 0,
            y: 0,
            nodeToggle: "unlockedNodes",
            xScale: 0,
            yScale: 0,
            imgHeight: 0,
            imgWidth: 0,
            pxToMeterRatio: 0
        }
        this.changeXScale = this.changeXScale.bind(this);
        this.changeYScale = this.changeYScale.bind(this);
        this.changeFPScale = this.changeFPScale.bind(this);
        this.imgRef = React.createRef()
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

            item.push({id, x, y, type});
            this.setState({nodeList: item});
            this.setState({nodeId: id + 1})
    }

        // creating a new node and adding it to the array save
        newIBeacon = (e) => {
            const item = this.state.iBeaconList;
            const id = this.state.iBeaconId;
            const x = 0;
            const y = 0;
            const type = "iBeacon";

            console.log(this.state.iBeaconId);
            item.push({id, x, y, type});
            this.setState({iBeaconList: item});
            this.setState({iBeaconId: id + 1});
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
        console.log(this.state.nodeList)
    }

    onSaveBeacon = (id, childX, childY, type) => {
        this.setState({x: childX, y: childY})

        const item = this.state.iBeaconList;
        const x = this.state.x;
        const y = this.state.y;
        item[id] = {id, x, y, type};
        console.log(this.state.iBeaconList)
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

    //saves the meter scale of the floorplan when set on the input texts
    //NOTE - logs in ChangeXScale and YScale show the pre-changed value due to how react deals with events, but it does update
    //see- the logs from Floorplan Scale function
    changeXScale(e){
        this.setState({xScale: e.target.value})
        console.log(this.state.xScale)
    }

    changeYScale(e){
        this.setState({yScale: e.target.value})
        console.log(this.state.yScale)
    }

    changeFPScale(){
        console.log("set X meters: " + this.state.xScale);
        console.log("set Y meters: " + this.state.yScale);

        const imgHeight = this.state.imgHeight;
        const imgWidth = this.state.imgWidth;
        const meterHeight = this.state.yScale;
        const meterWidth = this.state.xScale;

        const ratio = (meterHeight*meterWidth) / (imgHeight*imgWidth);
        const solution = Math.sqrt(ratio);

        console.log("solution: " + solution);
        
        console.log("image height: " + this.state.imgHeight);
        console.log("image width: " + this.state.imgWidth);
    }

    handleImageLoad = () =>{
        const height = this.imgRef.current.clientHeight;
        const width = this.imgRef.current.clientWidth;
        this.setState({imgHeight: height, imgWidth: width})
    }

    // renders the heatmap and draggable nodes
    render() {
        // if (this.state.nodeToggle === "lockNodes") {
        //     return(    
        //         <div className={'App'}>
        //             <div>
        //                 <button onClick={this.newNode}>New Node</button>
        //                 <button onClick={this.newIBeacon}>New IBeacon</button>
        //                 <button onClick={this.LockNodes}>Unlock Nodes</button>
        //                 <this.checkStart/>
        //                 <this.checkEnd/>

        //                 <br/>
        //                 <label for="dimensionx">Blueprint X Length (Meters):</label>
        //                 <input type="text" name="dimensionsx" value={this.state.xScale} onChange={this.changeXScale}/> <br/>
        //                 <label for="dimensionsy">Blueprint Y Length (Meters):</label>
        //                 <input type="text" name="dimensionsy" value={this.state.yScale} onChange={this.changeYScale}/> <br/>

        //                 <button onClick={this.changeFPScale}>Set Floorplan Dimensions</button>

        //                 <div className={'Heatmap'}>
        //                     <img src={DemoMap} alt={"demo map"} />
        //                 </div>
        //             </div>
        //                 <Linking nodeList={this.state.nodeList}/>
        //             <div>
        //                 {/*<button onClick={this.onSave}>save</button>*/}
        //                 <div className={"draggingBounds "+ this.state.nodeToggle}>
        //                     {this.state.nodeList.map((item, key) => {
        //                         return (
        //                             <Draggable x={item.x} y={item.y} parentCallback={this.onSaveNode} id={key} type={item.type} key={key}>
        //                                 <Node className={key}key={key} type={item.type} data={this.state.nodeData} nodeId={key}/>
        //                             </Draggable>
        //                         );
        //                     })}
        //                     {this.state.iBeaconList.map((item, key) => {
        //                         return (
        //                             <Draggable x={item.x} y={item.y} parentCallback={this.onSaveBeacon} id={key} key={key}>
        //                                 <IBeacon/>
        //                             </Draggable>
        //                         );
        //                     })}
        //                 </div>
        //                 <LineTo from="0" to="1" />
        //             </div>
        //         </div>
        //     );

        // } else {
            return(    
                <div className={'App'}>
                    <div>
                        <button onClick={this.newNode}>New Node</button>
                        <button onClick={this.newIBeacon}>New IBeacon</button>
                        <button onClick={this.LockNodes}>Lock Nodes</button>
                        <this.checkStart/>
                        <this.checkEnd/>


                        <br/>
                        <label for="dimensionx">Blueprint X Length (Meters):</label>
                        <input type="text" name="dimensionsx" value={this.state.xScale} onChange={this.changeXScale}/> <br/>
                        <label for="dimensionsy">Blueprint Y Length (Meters):</label>
                        <input type="text" name="dimensionsy" value={this.state.yScale} onChange={this.changeYScale}/> <br/>

                        <button onClick={this.changeFPScale}>Set Floorplan Dimensions</button><br/>

                        <div className={'Heatmap'}>
                            <img ref={this.imgRef} src={DemoMap} alt={"demo map"} onLoad={this.handleImageLoad}/>
                            {/* should made something to toggle maps on and off - for now it's DemoMap and DemoMap1 */}
                        </div>

                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds "+ this.state.nodeToggle}>
                            {this.state.nodeList.map((item, key) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveNode} id={key} type={item.type} key={key}>
                                        <Node className={key}key={key} type={item.type} data={this.state.nodeData} nodeId={key}/>
                                    </Draggable>
                                );
                            })}
                            {this.state.iBeaconList.map((item, key) => {
                                return (
                                    <Draggable x={item.x} y={item.y} parentCallback={this.onSaveBeacon} id={key} key={key}>
                                        <IBeacon/>
                                    </Draggable>
                                );
                            })}
                            <LineTo from="0" to="1" />
                        </div>
                    </div>
                </div>
            );
        // }
    }
}