import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import DemoMap from './Images/background.png';
import data from "../Media/media.json";
import DijkstraPath, {calculateMinimumDistance} from "./Dijkstra.js";
import './Node.css';
import '../App.css';

export default class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeList: [],
            connectList: [],
            distanceList: [],
            connectNodesPlaceholder: [],
            connectNodesDistance: [],
            nodeId: 0,
            nodeData: data,
            x: 0,
            y: 0
        }
        this.newNode = this.newNode.bind(this);
        this.onSave = this.onSave.bind(this);
        this.nodesLog = this.nodesLog.bind(this);
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

    //logs the nodes,connections and distance. Would have been better if all of it was stored in nodeList but I
    //couldn't find a valid way to do it 
    nodesLog = (nodeId, connectNodesPlaceholder, connectNodesDistance) =>{
        let itemId = this.state.nodeList.concat(nodeId);
        let itemConnects = this.state.connectList.concat(connectNodesPlaceholder);
        let itemDistances = this.state.distanceList.concat(connectNodesDistance);
        this.setState({
            nodeList: itemId,
            connectList: itemConnects,
            distanceList: itemDistances
        })
    }

    CallMinimumDistanceDijkstra = () =>{
        new DijkstraPath().calculateMinimumDistance();
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
            console.log(this.state.nodeList)
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
        return(    
            <div className={'App'}>

                <div className={'Heatmap'}>
                    <img src={DemoMap} alt={"demo map"} />
                </div>

                
                    <div>
                    <Draggable parentCallback={this.onSave} id={0} type={"start"} key={0} x={831} y={-55} connectNodesPlaceholder={[1]} connectNodesDistance={[3]}>
                        <Node key={0} type={"start"} data={this.state.nodeData} nodeId={0} connectNodesPlaceholder={[1]} connectNodesDistance={[3]} onSpawn={() => this.nodesLog(this.nodeId,this.connectNodesPlaceholder, this.connectNodesDistance)}/>
                    </Draggable>
                    <Draggable parentCallback={this.onSave} id={1} type={"waypoint"} key={1} x={842} y={-221} connectNodesPlaceholder={[0,2]} connectNodesDistance={[3,5]}>
                        <Node key={1} type={"waypoint"} data={this.state.nodeData} nodeId={1} connectNodesPlaceholder={[0,2]} connectNodesDistance={[3,5]} onSpawn={(e) => this.nodesLog(this.nodeId,this.connectNodesPlaceholder, this.connectNodesDistance)}/>
                    </Draggable>
                    <Draggable parentCallback={this.onSave} id={2} type={"waypoint"} key={2} x={672} y={-283} connectNodesPlaceholder={[1,3,4]} connectNodesDistance={[5, 4, 6]}>
                        <Node key={2} type={"waypoint"} data={this.state.nodeData} nodeId={2} connectNodesPlaceholder={[1,3,4]} connectNodesDistance={[5, 4, 6]} onSpawn={() => this.nodesLog(this.nodeId,this.connectNodesPlaceholder, this.connectNodesDistance)}/>
                    </Draggable>
                    <Draggable parentCallback={this.onSave} id={3} type={"waypoint"} key={3} x={726} y={-418} connectNodesPlaceholder={[2,5]} connectNodesDistance={[4, 3]}>
                        <Node key={3} type={"waypoint"} data={this.state.nodeData} nodeId={3} connectNodesPlaceholder={[2,5]} connectNodesDistance={[4, 3]} onSpawn={() => this.nodesLog(this.nodeId,this.connectNodesPlaceholder, this.connectNodesDistance)}/>
                    </Draggable>
                    <Draggable parentCallback={this.onSave} id={4} type={"waypoint"} key={4} x={506} y={-437} connectNodesPlaceholder={[2]} connectNodesDistance={[6]}>
                        <Node key={4} type={"waypoint"} data={this.state.nodeData} nodeId={4} connectNodesPlaceholder={[2]} connectNodesDistance={[6]} onSpawn={() => this.nodesLog(this.nodeId,this.connectNodesPlaceholder, this.connectNodesDistance)}/>
                    </Draggable>
                    <Draggable parentCallback={this.onSave} id={5} type={"end"} key={5} x={716} y={-516} connectNodesPlaceholder={[3]} connectNodesDistance={[3]}>
                        <Node key={5} type={"end"} data={this.state.nodeData} nodeId={5} connectNodesPlaceholder={[3]} connectNodesDistance={[3]} onSpawn={() => this.nodesLog(this.nodeId,this.connectNodesPlaceholder, this.connectNodesDistance)}/>
                    </Draggable>
                    </div>

                    <div>
                        <button onClick={() => this.CallMinimumDistanceDijkstra()}>Find Path</button>
                    </div>

            </div>
            
        );
    }
}