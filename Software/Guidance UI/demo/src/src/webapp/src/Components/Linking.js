import React, {Component} from 'react'

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
            startingNode: "",
            result: [],
            endingNode: "",
            ssid: this.props.ssid,
            floorplanid: this.props.floorplanid
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
                <button onClick={this.saveLinks}>Save Link</button>
                <button onClick={this.saveNodes}>Save Nodes</button>
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

    saveNodes = () => {
        this.state.nodeList.forEach(item =>  {
            fetch("/books/saveNode", {
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
                    connectednodes: item.nodeConnections.toString(),
                    ssid: this.state.ssid,
                    floorplanid: this.state.floorplanid
                })
            })
        })
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
        this.setState({selectedNode: parseInt(e.target.value)});
    }

    handleOnChange = (e) => {
        this.setState({input: parseInt(e.target.value)});
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
            newArr1[selNode].nodeConnections.push(value);
            newArr1[value].nodeConnections.push(selNode);

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
