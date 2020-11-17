import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import DemoMap from './Images/background.png';
import data from "../Media/media.json";
import './Node.css';
import '../App.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeList: [],
            nodeId: 0,
            nodeData: data,
            x: 0,
            y: 0,
            nodeToggle: "unlockedNodes"
        }
        this.newNode = this.newNode.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    // creating a new node and adding it to the array save
    newNode = (e) => {
            const item = this.state.nodeList;
            const id = this.state.nodeId;
            const x = 0;
            const y = 0;
            let type = "waypoint";
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
    onSave = (id, childX, childY, type) => {
        this.setState({x: childX, y: childY})

        const item = this.state.nodeList;
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
        if (this.state.nodeToggle === "lockNodes") {
            return(    
                <div className={'App'}>
                    <div>
                        <button onClick={this.newNode}>New Node</button>
                        <button onClick={this.LockNodes}>Unlock Nodes</button>
                        <this.checkStart/>
                        <this.checkEnd/>
                    </div>
                        <div className={"linkMenu"}>
                            <h2>Node Linker</h2>
                            <input placeholder="ID node"></input>
                        </div>
                    <div>
                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds "+ this.state.nodeToggle}>
                            {this.state.nodeList.map((item, key) => {
                                return (
                                    <Draggable parentCallback={this.onSave} id={key} type={item.type} key={key}>
                                        <Node key={key} type={item.type} data={this.state.nodeData} nodeId={key}/>
                                    </Draggable>
                                );
                            })}
                        </div>

                    </div>
                </div>
            );

        } else {
            return(    
                <div className={'App'}>
                    <div>
                        <button onClick={this.newNode}>New Node</button>
                        <button onClick={this.LockNodes}>Lock Nodes</button>
                        <this.checkStart/>
                        <this.checkEnd/>
                        {/*<button onClick={this.onSave}>save</button>*/}
                        <div className={"draggingBounds "+ this.state.nodeToggle}>
                            {this.state.nodeList.map((item, key) => {
                                return (
                                    <Draggable parentCallback={this.onSave} id={key} type={item.type} key={key}>
                                        <Node key={key} type={item.type} data={this.state.nodeData} nodeId={key}/>
                                    </Draggable>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}