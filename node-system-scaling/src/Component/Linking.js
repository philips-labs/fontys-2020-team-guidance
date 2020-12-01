import React, {Component} from 'react'

export default class Linking extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            input: "",
            nodeList: this.props.nodeList,
            count: 0,
            selectedNode: "",
            distance: 0,
            startingNode: "",
            result: [],
            endingNode: "",
        };
    }

    render() {
        return (
            <div className={"linkMenu"}>
                <div>
                <h2>Node Linker</h2>
                <input placeholder="ID node" onChange={this.handleSelector}></input>
                <input type="checkbox" id="destinationNode" name="destinationNode" onChange={this.handleCheck}/>
                <label>Destination Node</label>
                <input placeholder={"Connected Node"} onChange={this.handleOnChange}/>
                <button onClick={this.saveLinks}>Save</button>
                </div>
                <div>
                    <p>Path Finder</p>
                    <input placeholder={"starting node"} onChange={this.handleStart}></input>
                    <input placeholder={"ending node"} onChange={this.handleEnd}></input>
                    <p>{this.state.result}</p>
                    <button onClick={this.calculatePath}>Find Path</button>
                </div>
            </div>
        );
    }

    appendInput() {
        var result = this.state.inputs;
        var id = this.state.inputs.length;
        var value = "";
        if (this.state.inputs.length === 0) {
            id = 0;
        }
        result.push({id, value});
        this.setState({input: result});
    }

    handleStart = (e) => {
        this.setState({startingNode: e.target.value});
    }

    handleEnd = (e) => {
        this.setState({endingNode: e.target.value});
    }

    handleCheck = (e) => {
        var list = this.state.nodeList;
        if (e.target.checked === true)
        {
            list[this.state.selectedNode].type = "destinationNode";
        }
    }
    
    handleSelector = (e) => {
        this.setState({selectedNode: e.target.value});
    }

    handleOnChange = (e) => {
        this.setState({input: e.target.value});
    }

    saveLinks = () => {
        const newArr1 = this.state.nodeList;
        newArr1.forEach (element => {
            if (element.nodeConnections === undefined)
            {
                element.nodeConnections = [];
            }
        })

        const selNode = this.state.selectedNode;

        try {
            var value = this.state.input;
            var distance = this.calculateDistance(selNode, value)
            newArr1[selNode].nodeConnections.push({value, distance});
            newArr1[value].nodeConnections.push({selNode, distance});

        this.setState({nodeList: newArr1})

        } catch {}
        console.log(this.state.nodeList);
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

        var distance;

        if(node1.x === node2.x)
        {
            if(node1.y>node2.y) { 
                distance= node1.y - node2.y; 
            }
            else distance = node2.y - node1.y;
        }

        if(node1.y === node2.y)
        {
            if(node1.x>node2.x) { 
                distance= node1.x - node2.x; 
            }
            else distance = node2.x - node1.x;
        }

        distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        return distance;
    }

    calculatePath = () => {
        var start = this.state.startingNode;
        //var end = this.state.endingNode;
        var paths = this.state.nodeList;
        var closestNode;
        var currentPath = [];

        console.log(paths[start].nodeConnections);
        paths[start].nodeConnections.forEach(node => {
            if (closestNode === undefined) {
                closestNode = node.value;
                console.log("help");
            }
            else if (node < closestNode) {
                closestNode = node.value;
            }
        })

        currentPath.push(closestNode);
        console.log(closestNode);
    }
}
